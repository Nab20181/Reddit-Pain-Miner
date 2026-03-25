export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { posts, subreddit, apiKey: userKey } = req.body;

  // Use server-side key if set, otherwise fall back to user-supplied key
  const apiKey = process.env.ANTHROPIC_API_KEY || userKey;

  if (!posts || !apiKey) {
    return res.status(400).json({ error: 'Posts and API key are required.' });
  }

  // Keep only top 15 posts, titles only (no body text) to stay under rate limits
  const trimmedPosts = posts.slice(0, 15);
  const postsText = trimmedPosts
    .map((p, i) => `[${i + 1}] "${p.title}" (${p.score} upvotes)`)
    .join('\n');

  const prompt = `Analyze these Reddit post titles from r/${subreddit}. Return ONLY raw JSON, no markdown.

${postsText}

{"painPoints":[{"title":"short","description":"1-2 sentences","intensity":"high|medium|low","sources":[1,2]}],"themes":[{"theme":"name","detail":"pattern"}],"opportunities":[{"idea":"product idea","why":"reason"}],"quotes":[{"text":"quote from a title","why":"marketing value"}],"summary":"2-3 sentence opportunity summary"}

Rules: 5 painPoints ranked by intensity (sources=post numbers up to 3), 3-4 themes, 3 opportunities, 3-4 quotes, be specific.`;

  try {
    const claudeRes = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 2000,
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    if (!claudeRes.ok) {
      const err = await claudeRes.json();
      console.error('Claude error:', claudeRes.status, JSON.stringify(err));
      return res.status(claudeRes.status).json({ error: `Claude (${claudeRes.status}): ${err.error?.message || JSON.stringify(err)}` });
    }

    const claudeData = await claudeRes.json();
    let raw = claudeData.content[0].text.trim();

    // Strip markdown code fences if Claude added them
    raw = raw.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/\s*```$/, '');

    let analysis;
    try {
      analysis = JSON.parse(raw);
    } catch (e) {
      return res.status(500).json({ error: 'Failed to parse Claude response. Try again.' });
    }

    return res.status(200).json({ analysis, postCount: posts.length });
  } catch (err) {
    return res.status(500).json({ error: `Request failed: ${err.message}` });
  }
}
