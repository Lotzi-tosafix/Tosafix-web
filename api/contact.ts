export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, phone, subject, message } = req.body || {};
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'נא למלא את כל שדות החובה' });
  }
  
  const safeHtml = (str: string) => (str || '').toString()
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
    
  const RESEND_API_KEY = process.env.RESEND_API_KEY?.trim();
  const CONTACT_EMAIL = process.env.CONTACT_EMAIL?.trim()?.toLowerCase();
  
  if (!RESEND_API_KEY || !CONTACT_EMAIL) {
    return res.status(500).json({ 
      error: 'שגיאת תצורה בשרת - וודא שמשתני הסביבה RESEND_API_KEY ו-CONTACT_EMAIL מוגדרים בוורסל' 
    });
  }
  
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json', 
        'Authorization': `Bearer ${RESEND_API_KEY}` 
      },
      body: JSON.stringify({
        from: 'Tosafix Contact <onboarding@resend.dev>',
        to: [CONTACT_EMAIL],
        subject: `תוספיקס - ${safeHtml(subject)}`,
        reply_to: safeHtml(email),
        html: `<div dir="rtl"><h2>הודעה חדשה מאתר תוספיקס</h2><p><strong>שם:</strong> ${safeHtml(name)}</p><p><strong>אימייל:</strong> ${safeHtml(email)}</p><p><strong>טלפון:</strong> ${safeHtml(phone || 'לא הוזן')}</p><p><strong>נושא:</strong> ${safeHtml(subject)}</p><h3>הודעה:</h3><p style="white-space: pre-wrap;">${safeHtml(message)}</p></div>`
      })
    });
    
    if (response.ok) {
      return res.status(200).json({ success: true });
    } else {
      const errorText = await response.text();
      console.error('Resend API error:', errorText);
      return res.status(500).json({ error: 'System error via resend' });
    }
  } catch(e) {
    console.error('Fetch error:', e);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
