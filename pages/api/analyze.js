export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { posts, subreddit, apiKey: userKey } = req.body;

  // Use server-side key if set, otherwise fall back to user-supplied key
  const apiKey = process.env.ANTHROPIC_API_KEY || userKey;

  if (!posts || !apiKey) {
    return res.status(400).json({ error: 'Posts and API key are required.' });
  }

  const trimmedPosts = posts.slice(0, 25);
  const postsText = trimmedPosts
    .map((p, i) => `[${i + 1}] "${p.title}" (${p.score} upvotes)\n${p.selftext?.slice(0, 150) || ''}`)
    .join('\n\n');

  const prompt = `You are a sharp product researcher. Analyze these Reddit posts from r/${subreddit} and return a JSON object — nothing else, no markdown, no explanation, just raw JSON.

Posts:
${postsText}

Return exactly this structure:
{
  "painPoints": [
    { "title": "short title", "description": "1-2 sentence description with specifics", "intensity": "high|medium|low", "sources": [1, 4, 7] }
  ],
  "themes": [
    { "theme": "theme name", "detail": "what pattern you noticed" }
  ],
  "opportunities": [
    { "idea": "product/service idea", "why": "why it fits the pain" }
  ],
  "quotes": [
    { "text": "direct quote from a post title or body", "why": "why this quote matters for marketing" }
  ],
  "summary": "2-3 sentence executive summary of the biggest opportunity in this subreddit"
}

Rules:
- painPoints: exactly 5 items, ranked by intensity. sources = array of post numbers (the [N] numbers) that support this pain point, up to 3
- themes: 3-4 items
- opportunities: 3 items  
- quotes: 3-4 direct quotes
- Be specific. No fluff. These are for founders.`;

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
