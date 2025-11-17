// /api/getSong.js

export default async function handler(request, response) {
  // The target API URL
  const targetUrl = `https://jewishradionetwork.com/system/web/song.json?q=${Date.now()}`;

  try {
    const fetchResponse = await fetch(targetUrl);

    // If the request to the radio server fails
    if (!fetchResponse.ok) {
      return response.status(fetchResponse.status).json({ error: 'Failed to fetch song data' });
    }

    const data = await fetchResponse.json();

    // Set headers to allow the client to read the information
    // Vercel handles this automatically for same-origin requests, but it's good practice.
    response.setHeader('Access-Control-Allow-Origin', '*'); 
    // Set a short cache time to ensure fresh data
    response.setHeader('Cache-Control', 's-maxage=5, stale-while-revalidate');

    // Send the data back to the client
    return response.status(200).json(data);

  } catch (error) {
    console.error('Error in /api/getSong:', error);
    return response.status(500).json({ error: 'Internal Server Error' });
  }
}
