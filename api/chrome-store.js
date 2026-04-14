export default async function handler(request, response) {
  const { id } = request.query;

  if (!id || typeof id !== 'string' || !/^[a-p]{32}$/.test(id)) {
    return response.status(400).json({ error: 'Invalid Extension ID' });
  }

  try {
    const url = `https://chromewebstore.google.com/detail/${id}?hl=he`;
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.status}`);
    }

    const html = await res.text();

    // Extract rating
    const ratingMatch = html.match(/<span class="Vq0ZA">([\d.]+)<\/span>/);
    const rating = ratingMatch ? ratingMatch[1] : null;

    // Extract users
    // The HTML structure is like: <div class="F9iKBc"><a ...>תוסף</a><a ...>תקשורת</a>89 משתמשים</div>
    // We can match the text before </div>
    const usersMatch = html.match(/<div class="F9iKBc">.*?<\/a>([^<]+)<\/div>/);
    let users = null;
    if (usersMatch && usersMatch[1]) {
      users = usersMatch[1].trim();
    } else {
      // Fallback regex if there's no second <a> tag or different structure
      const fallbackUsersMatch = html.match(/<div class="F9iKBc">.*?([^>]+משתמשים|[^>]+users)<\/div>/);
      if (fallbackUsersMatch && fallbackUsersMatch[1]) {
        users = fallbackUsersMatch[1].trim();
      }
    }

    // Cache the result for 24 hours to avoid rate limits
    response.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate');

    return response.status(200).json({
      rating,
      users
    });
  } catch (error) {
    console.error('Error fetching Chrome Web Store data:', error);
    return response.status(500).json({ error: 'Failed to fetch data' });
  }
}
