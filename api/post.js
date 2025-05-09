export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Nur POST erlaubt' });
  }

  const { title, content, status } = req.body;

  const username = 'max steiner';
  const applicationPassword = 'rKxr 3IXX WFLr Wd1I YaIy sgrt';
  const auth = Buffer.from(`${username}:${applicationPassword}`).toString('base64');

  try {
    const wpResponse = await fetch('https://coinfocus.de/wp-json/wp/v2/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${auth}`
      },
      body: JSON.stringify({ title, content, status })
    });

    const data = await wpResponse.json();

    if (!wpResponse.ok) {
      return res.status(wpResponse.status).json({ error: data });
    }

    return res.status(200).json({ success: true, post: data });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
