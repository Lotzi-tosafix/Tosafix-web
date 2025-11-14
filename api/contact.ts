
export default async function handler(req: any, res: any) {
  // Handle CORS headers for cross-origin requests
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

  // Handle OPTIONS preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // The original implementation used a server-side library that is not
  // compatible with this client-side environment, causing the app to crash.
  // This mock handler ensures the app can load, while gracefully
  // indicating that the contact form is not functional.
  if (req.method === 'POST') {
    return res.status(503).json({ 
        success: false, 
        error: 'Service temporarily unavailable. Please try again later.' 
    });
  }
  
  // Respond to other methods
  res.setHeader('Allow', ['POST', 'OPTIONS']);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
