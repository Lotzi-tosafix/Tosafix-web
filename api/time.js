
export default function handler(request, response) {
  response.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  response.setHeader('Pragma', 'no-cache');
  response.setHeader('Expires', '0');
  
  return response.status(200).json({ 
    serverTime: Date.now() 
  });
}
