// /api/getJmsSong.js

export default async function handler(request, response) {
  // The target API URL for Jewish Music Stream
  const targetUrl = `https://jewishmusicstream.com/system/web/song.json?q=${Date.now()}`;

  try {
    const fetchResponse = await fetch(targetUrl);

    // If the request to the radio server fails
    if (!fetchResponse.ok) {
      return response.status(fetchResponse.status).json({ error: 'Failed to fetch song data from JMS' });
    }

    const data = await fetchResponse.json();

    response.setHeader('Access-Control-Allow-Origin', '*'); 
    response.setHeader('Cache-Control', 's-maxage=5, stale-while-revalidate');

    return response.status(200).json(data);

  } catch (error) {
    console.error('Error in /api/getJmsSong:', error);
    return response.status(500).json({ error: 'Internal Server Error' });
  }
}
