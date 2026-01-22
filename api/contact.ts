
export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, phone, subject, message } = req.body;

  // Basic validation
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'נא למלא את כל שדות החובה' });
  }

  // Normalizing variables to prevent case-sensitivity issues with Resend
  const RESEND_API_KEY = process.env.RESEND_API_KEY?.trim();
  const CONTACT_EMAIL = process.env.CONTACT_EMAIL?.trim().toLowerCase();

  if (!RESEND_API_KEY || !CONTACT_EMAIL) {
    console.error('Missing Resend configuration environment variables');
    return res.status(500).json({ error: 'שגיאת תצורה בשרת - וודא שמשתני הסביבה מוגדרים' });
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Tosafix Contact <onboarding@resend.dev>',
        to: [CONTACT_EMAIL],
        subject: `תוספיקס - ${subject}`,
        reply_to: email,
        html: `
          <div dir="rtl" style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px; max-width: 600px;">
            <h2 style="color: #3B82F6; border-bottom: 2px solid #3B82F6; padding-bottom: 10px;">פנייה חדשה מהאתר</h2>
            <p><strong>שם השולח:</strong> ${name}</p>
            <p><strong>אימייל לחזרה:</strong> ${email}</p>
            <p><strong>טלפון:</strong> ${phone || 'לא צוין'}</p>
            <p><strong>נושא:</strong> ${subject}</p>
            <div style="background: #f9f9f9; padding: 15px; border-radius: 5px; margin-top: 20px; border: 1px solid #ddd;">
              <p><strong>תוכן ההודעה:</strong></p>
              <p style="white-space: pre-wrap;">${message}</p>
            </div>
            <hr style="margin-top: 30px; border: 0; border-top: 1px solid #eee;" />
            <p style="font-size: 12px; color: #999; text-align: center;">הודעה זו נשלחה אוטומטית ממערכת תוספיקס. לחיצה על "השב" בג'ימייל תפתח מענה ישיר למשתמש.</p>
          </div>
        `,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      return res.status(200).json({ success: true });
    } else {
      console.error('Resend error details:', data);
      // We pass the detailed message from Resend so the user knows exactly why it failed
      const errorMsg = data.message || 'כשל בשליחת המייל';
      return res.status(response.status).json({ error: errorMsg });
    }
  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ error: 'אירעה שגיאה פנימית בשליחה' });
  }
}
