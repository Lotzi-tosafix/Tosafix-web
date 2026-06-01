export default async function handler(req: any, res: any) {
  try {
    const response = await fetch(`https://jewishmusicstream.com/system/web/song.json?q=${Date.now()}`);
    if (!response.ok) {
      return res.status(response.status).json({ error: 'Failed to fetch radio' });
    }
    const data = await response.json();
    return res.status(200).json(data);
  } catch(e) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
