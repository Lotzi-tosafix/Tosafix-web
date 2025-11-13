import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: any, res: any) {
  // Handle CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

  // Handle OPTIONS request for preflight
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

    const emailHtml = `
      <div dir="rtl" style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f6f9fc; padding: 40px 20px;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08);">
          
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #5FB8D6 0%, #9B7FD9 100%); padding: 30px; text-align: center;">
            <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold;">הודעה חדשה מאתר Tosafix</h1>
          </div>
          
          <!-- Content -->
          <div style="padding: 35px;">
            
            <!-- Details Section -->
            <div style="margin-bottom: 30px;">
              <div style="margin-bottom: 15px;">
                <span style="color: #64748b; font-size: 18px; display: block; margin-bottom: 5px;">שם השולח:</span>
                <div style="color: #1e293b; font-weight: 600; font-size: 20px;">${name || 'לא צוין'}</div>
              </div>
              
              <div style="margin-bottom: 15px;">
                <span style="color: #64748b; font-size: 18px; display: block; margin-bottom: 5px;">אימייל:</span>
                <div style="color: #1e293b; font-weight: 600; font-size: 20px;">
                  <a href="mailto:${email}" style="color: #5FB8D6; text-decoration: none;">${email}</a>
                </div>
              </div>

              <div style="margin-bottom: 15px;">
                <span style="color: #64748b; font-size: 18px; display: block; margin-bottom: 5px;">טלפון:</span>
                <div style="color: #1e293b; font-weight: 600; font-size: 20px;">${phone || 'לא צוין'}</div>
              </div>
            </div>

            <div style="border-top: 1px solid #e2e8f0; margin: 25px 0;"></div>

            <!-- Message Section -->
            <div>
              <span style="color: #64748b; font-size: 18px; font-weight: 600; display: block; margin-bottom: 15px;">תוכן ההודעה:</span>
              <div style="background-color: #f8fafc; border-radius: 12px; padding: 25px; color: #334155; line-height: 1.6; font-size: 20px;">
                ${message.replace(/\n/g, '<br>')}
              </div>
            </div>

          </div>
          
          <!-- Footer -->
          <div style="background-color: #f8fafc; padding: 20px; text-align: center; border-top: 1px solid #eef2f6;">
            <p style="margin: 0; color: #94a3b8; font-size: 14px;">נשלח אוטומטית דרך טופס צור קשר באתר Tosafix</p>
          </div>
        </div>
      </div>
    `;

    const data = await resend.emails.send({
      from: 'Tosafix Contact <onboarding@resend.dev>',
      to: process.env.CONTACT_EMAIL || 'tosafix@gmail.com',
      subject: `🔔 פנייה חדשה: ${name} - תוספיקס`,
      replyTo: email,
      html: emailHtml,
    });

    if (data.error) {
      console.error('Resend API error:', data.error);
      return res.status(400).json({ success: false, error: data.error });
    }

    return res.status(200).json({ success: true, data });
  } catch (error: any) {
    console.error('Server error:', error);
    return res.status(500).json({ success: false, error: error.message || 'Internal Server Error' });
  }
}