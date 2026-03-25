export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { posts, subreddit, apiKey } = req.body;

  if (!posts || !apiKey) {
    return res.status(400).json({ error: 'Posts and API key are required.' });
  }

  // Limit to top 25 posts, short snippets to stay within token limits
  const trimmedPosts = posts.slice(0, 25);
  const postsText = trimmedPosts
    .map((p, i) => `[${i + 1}] "${p.title}" (${p.score} upvotes)\n${p.selftext?.slice(0, 150) || ''}`)
    .join('\n\n');

  const prompt = `You are a product researcher analyzing Reddit posts to find real, recurring pain points.

Here are the top posts from r/${subreddit} this month:

${postsText}

Analyze these posts and extract:

1. **Top 5 Pain Points** - The most common complaints, frustrations, or unmet needs. Be specific. Quote the posts where relevant.

2. **Recurring Themes** - Patterns that show up repeatedly across multiple posts.

3. **Unmet Needs / Product Opportunities** - What tools, services, or solutions are people wishing existed? What are they asking for that doesn't seem to exist yet?

4. **Emotional Intensity** - Which problems seem to cause the most frustration? What do people seem most desperate about?

5. **Quotes to Save** - 3-5 direct quotes from the posts that best capture the pain. These are gold for landing pages and marketing copy.

Be specific, actionable, and direct. Skip anything generic. This is for founders looking for real product opportunities.`;

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
        max_tokens: 1500,
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    if (!claudeRes.ok) {
      const err = await claudeRes.json();
      const errMsg = err.error?.message || JSON.stringify(err);
      console.error('Claude error:', claudeRes.status, JSON.stringify(err));
      return res.status(claudeRes.status).json({ error: `Claude (${claudeRes.status}): ${errMsg}` });
    }

    const claudeData = await claudeRes.json();
    const analysis = claudeData.content[0].text;

    return res.status(200).json({ analysis, postCount: posts.length });
  } catch (err) {
    return res.status(500).json({ error: `Claude API failed: ${err.message}` });
  }
}
