
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  // Handle CORS if necessary, though usually not needed for same-origin calls on Vercel
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, phone, message } = req.body;

    if (!email || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const data = await resend.emails.send({
      from: 'Tosafix Contact <onboarding@resend.dev>', // השתמש בכתובת זו או בדומיין מאומת משלך ב-Resend
      to: process.env.CONTACT_EMAIL || 'tosafix@gmail.com',
      reply_to: email,
      subject: `פנייה חדשה מאתר תוספיקס: ${name || 'ללא שם'}`,
      html: `
        <div dir="rtl" style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #1C1C28; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #f8fafc;">
          <div style="text-align: center; margin-bottom: 24px;">
             <h2 style="color: #5FB8D6; margin: 0;">הודעה חדשה התקבלה</h2>
             <p style="color: #64748b; margin-top: 4px; font-size: 14px;">מאתר Tosafix</p>
          </div>
          
          <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
            <p style="margin: 8px 0;"><strong>👤 שם:</strong> ${name || 'לא צוין'}</p>
            <p style="margin: 8px 0;"><strong>📧 אימייל:</strong> <a href="mailto:${email}" style="color: #5B72E8; text-decoration: none;">${email}</a></p>
            <p style="margin: 8px 0;"><strong>📱 טלפון:</strong> ${phone || 'לא צוין'}</p>
            
            <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 16px 0;" />
            
            <p style="font-weight: bold; margin-bottom: 8px;">תוכן ההודעה:</p>
            <div style="background-color: #f1f5f9; padding: 12px; border-radius: 6px; white-space: pre-wrap; line-height: 1.5;">${message}</div>
          </div>
          
          <div style="text-align: center; margin-top: 24px; font-size: 12px; color: #94a3b8;">
            נשלח באמצעות Vercel & Resend
          </div>
        </div>
      `,
    });

    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error('Resend Error:', error);
    return res.status(500).json({ error: 'Failed to send email' });
  }
}
