import express from "express";
import admin from "firebase-admin";
import fs from "fs";
import path from "path";

// Initialize Firebase Admin (safe for both Cloud Run and Vercel)
if (!admin.apps.length) {
  try {
    if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
      // For Vercel / serverless: parse the injected env var JSON
      const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        projectId: "gen-lang-client-0806244825"
      });
    } else {
      // For Cloud Run / AI Studio: uses Application Default Credentials
      admin.initializeApp({
        projectId: "gen-lang-client-0806244825"
      });
    }
  } catch (err) {
    console.error("Firebase Admin initialization error", err);
  }
}

let firestoreDatabaseId = "ai-studio-87498fb8-9423-4db0-ba42-6447d69e9d5e";

import { getFirestore } from "firebase-admin/firestore";
const db = firestoreDatabaseId ? getFirestore(admin.app(), firestoreDatabaseId) : admin.firestore();
const app = express();
app.use(express.json());

// Helper to fetch from Chrome Store
const fetchChromeStoreData = async (id: string) => {
  if (!id || typeof id !== 'string' || !/^[a-p]{32}$/.test(id)) return null;
  try {
    const url = `https://chromewebstore.google.com/detail/${id}?hl=he`;
    const res = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0 Safari/537.36' }
    });
    if (!res.ok) return null;
    const html = await res.text();
    const ratingMatch = html.match(/<span class="Vq0ZA">([\\d.]+)<\/span>/);
    const rating = ratingMatch ? parseFloat(ratingMatch[1]) : 0;
    
    const usersMatch = html.match(/<div class="F9iKBc">.*?<\/a>([^<]+)<\/div>/);
    let users = 0;
    if (usersMatch && usersMatch[1]) {
      users = parseInt(usersMatch[1].replace(/\\D/g, ''), 10);
    } else {
      const fallbackUsersMatch = html.match(/<div class="F9iKBc">.*?([^>]+משתמשים|[^>]+users)<\/div>/);
      if (fallbackUsersMatch && fallbackUsersMatch[1]) {
        users = parseInt(fallbackUsersMatch[1].replace(/\\D/g, ''), 10);
      }
    }
    return { rating, users };
  } catch (e) {
    console.error('Failed to fetch store data for', id, e);
    return null;
  }
};

// Extracted sync logic
const syncExtensionsStats = async () => {
  const defaultIds = [
    'fpebdkfpncadlnknmhcobmgldchkjnbg', // Yamina
    'pljocldidmllomjngemigbnjajoeapim', // NetSkin
    'obpgeiabakddldckkcgllpbgngmdgpln', // Hebrew Date
    'djchhhddhhbpldihndccbkeilbpkckem', // My Emoji
    'jmbcbgajfppijolbnngohabfhmhicjhn'  // Edge Opener
  ];
  for (const id of defaultIds) {
    const data = await fetchChromeStoreData(id);
    if (data) {
      await db.collection('extensions_stats').doc(id).set({
        users: data.users,
        rating: data.rating,
        ratingCount: 0, 
        lastUpdated: Date.now()
      }, { merge: true });
    }
  }
};

// Vercel Cron Endpoint
app.get("/api/cron/sync-extensions", async (req, res) => {
  try {
    await syncExtensionsStats();
    res.status(200).send("Synced extensions successfully");
  } catch (e) {
    console.error(e);
    res.status(500).send("Sync failed");
  }
});

// API Routes
app.get("/api/chrome-store", async (req, res) => {
  const id = req.query.id as string;
  if (!id) {
     res.status(400).json({ error: 'Missing ID' });
     return;
  }
  try {
    const docRef = await db.collection('extensions_stats').doc(id).get();
    if (docRef.exists) {
      const data = docRef.data();
      // If it's fresh enough (e.g. updated in the last 24h), return it.
      if (data && data.lastUpdated && Date.now() - data.lastUpdated < 24 * 60 * 60 * 1000) {
        res.status(200).json({ rating: data.rating, users: data.users ? `${data.users.toLocaleString()} משתמשים` : null });
        return;
      }
    }
    
    // Fetch on the fly if missing or stale
    const freshData = await fetchChromeStoreData(id);
    if (freshData) {
      await db.collection('extensions_stats').doc(id).set({
        users: freshData.users,
        rating: freshData.rating,
        ratingCount: 0,
        lastUpdated: Date.now()
      }, { merge: true });
      res.status(200).json({ rating: freshData.rating, users: freshData.users ? `${freshData.users.toLocaleString()} משתמשים` : null });
      return;
    }
    
    res.status(404).json({ error: 'Not found on store' });
  } catch (e) {
    console.error("Error fetching extension", id, e);
    res.status(500).json({ error: 'Server error' });
  }
});

app.post("/api/useTool", async (req, res) => {
  const { toolId } = req.body;
  if (!toolId) {
    res.status(400).json({ error: 'Missing toolId' });
    return;
  }
  try {
    const toolRef = db.collection('nosafix_tools').doc(toolId);
    await toolRef.set({
      usageCount: admin.firestore.FieldValue.increment(1)
    }, { merge: true });
    res.status(200).json({ success: true });
  } catch(e) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.post("/api/rateTool", async (req, res) => {
  const { idToken, toolId, rating } = req.body;
  if (!idToken || !toolId || typeof rating !== 'number') {
    res.status(400).json({ error: 'Missing parameters' });
    return;
  }
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const uid = decodedToken.uid;
    
    const toolRef = db.collection('nosafix_tools').doc(toolId);
    const ratingRef = toolRef.collection('ratings').doc(uid);
    
    await db.runTransaction(async (transaction) => {
      const ratingDoc = await transaction.get(ratingRef);
      let oldRating = 0;
      let isUpdate = false;
      if (ratingDoc.exists) {
        oldRating = ratingDoc.data()?.rating || 0;
        isUpdate = true;
      }

      const toolDoc = await transaction.get(toolRef);
      let ratingSum = toolDoc.data()?.ratingSum || 0;
      let ratingCount = toolDoc.data()?.ratingCount || 0;

      if (isUpdate) {
        ratingSum = ratingSum - oldRating + rating;
      } else {
        ratingSum += rating;
        ratingCount += 1;
      }
      
      let avg = ratingSum / ratingCount;

      transaction.set(ratingRef, { userId: uid, rating, timestamp: Date.now() });
      transaction.set(toolRef, { ratingSum, ratingCount, averageRating: avg }, { merge: true });
    });

    res.status(200).json({ success: true });
  } catch(e) {
     console.error("error rating", e);
     res.status(401).json({ error: 'Unauthorized or error' });
  }
});

app.post("/api/contact", async (req, res) => {
  const { name, email, phone, subject, message } = req.body;
  if (!name || !email || !subject || !message) {
    res.status(400).json({ error: 'נא למלא את כל שדות החובה' });
    return;
  }
  const safeHtml = (str: string) => (str || '').toString().replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
  const RESEND_API_KEY = process.env.RESEND_API_KEY?.trim();
  const CONTACT_EMAIL = process.env.CONTACT_EMAIL?.trim().toLowerCase();
  
  if (!RESEND_API_KEY || !CONTACT_EMAIL) {
    res.status(500).json({ error: 'שגיאת תצורה בשרת - וודא שמשתני הסביבה מוגדרים' });
    return;
  }
  
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${RESEND_API_KEY}` },
      body: JSON.stringify({
        from: 'Tosafix Contact <onboarding@resend.dev>',
        to: [CONTACT_EMAIL],
        subject: `תוספיקס - ${safeHtml(subject)}`,
        reply_to: safeHtml(email),
        html: `<div dir="rtl"><h2>הודעה חדשה מאתר תוספיקס</h2><p><strong>שם:</strong> ${safeHtml(name)}</p><p><strong>אימייל:</strong> ${safeHtml(email)}</p><p><strong>טלפון:</strong> ${safeHtml(phone || 'לא הוזן')}</p><p><strong>נושא:</strong> ${safeHtml(subject)}</p><h3>הודעה:</h3><p style="white-space: pre-wrap;">${safeHtml(message)}</p></div>`
      })
    });
    if (response.ok) {
      res.status(200).json({ success: true });
    } else {
      res.status(500).json({ error: 'System error via resend' });
    }
  } catch(e) {
    res.status(500).json({ error: 'Internal Error' });
  }
});

app.get("/api/getSong", async (req, res) => {
  try {
    const resp = await fetch(`https://jewishradionetwork.com/system/web/song.json?q=${Date.now()}`);
    if (!resp.ok) return res.status(resp.status).json({ error: 'Failed to fetch radio' });
    const data = await resp.json();
    res.status(200).json(data);
  } catch(e) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get("/api/getJmsSong", async (req, res) => {
  try {
    const resp = await fetch(`https://jewishmusicstream.com/system/web/song.json?q=${Date.now()}`);
    if (!resp.ok) return res.status(resp.status).json({ error: 'Failed to fetch radio' });
    const data = await resp.json();
    res.status(200).json(data);
  } catch(e) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export { app as expressApp, syncExtensionsStats };
