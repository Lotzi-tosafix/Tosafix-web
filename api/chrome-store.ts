export default async function handler(req: any, res: any) {
  const id = req.query.id as string;
  if (!id) {
    return res.status(400).json({ error: 'Missing ID' });
  }

  if (!/^[a-p]{32}$/.test(id)) {
    return res.status(400).json({ error: 'Invalid ID' });
  }

  try {
    const url = `https://chromewebstore.google.com/detail/${id}?hl=he`;
    const response = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0 Safari/537.36' }
    });
    if (!response.ok) {
      return res.status(404).json({ error: 'Not found on store' });
    }
    const html = await response.text();
    const ratingMatch = html.match(/<span class="Vq0ZA">([\d.]+)<\/span>/);
    const rating = ratingMatch ? parseFloat(ratingMatch[1]) : 0;
    
    let users = 0;
    const usersMatch = html.match(/<div class="F9iKBc">.*?<\/a>([^<]+)<\/div>/);
    if (usersMatch && usersMatch[1]) {
      users = parseInt(usersMatch[1].replace(/\D/g, ''), 10);
    } else {
      const fallbackUsersMatch = html.match(/<div class="F9iKBc">.*?([^>]+משתמשים|[^>]+users)<\/div>/);
      if (fallbackUsersMatch && fallbackUsersMatch[1]) {
        users = parseInt(fallbackUsersMatch[1].replace(/\D/g, ''), 10);
      }
    }
    
    return res.status(200).json({ 
      rating, 
      users: users ? `${users.toLocaleString()} משתמשים` : null 
    });
  } catch (e) {
    console.error("Error fetching extension", id, e);
    return res.status(500).json({ error: 'Server error' });
  }
}
