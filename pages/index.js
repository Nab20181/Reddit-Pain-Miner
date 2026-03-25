import { useState } from 'react';

export default function Home() {
  const [subreddit, setSubreddit] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [postCount, setPostCount] = useState(null);

  const analyze = async () => {
    if (!subreddit.trim() || !apiKey.trim()) {
      setError('Please enter both a subreddit and your Claude API key.');
      return;
    }

    setLoading(true);
    setResult(null);
    setError(null);
    setPostCount(null);

    try {
      // Fetch Reddit directly from browser (avoids server-side blocks)
      setLoadingMsg('Fetching Reddit posts...');
      const sub = subreddit.trim().replace(/^r\//, '');
      const redditRes = await fetch(
        `https://www.reddit.com/r/${sub}/top.json?limit=50&t=month`,
        { headers: { 'Accept': 'application/json' } }
      );

      if (!redditRes.ok) {
        throw new Error(`Subreddit not found or private (Reddit returned ${redditRes.status})`);
      }

      const redditData = await redditRes.json();
      const posts = redditData.data.children.map(p => ({
        title: p.data.title,
        selftext: p.data.selftext?.slice(0, 300) || '',
        score: p.data.score,
        num_comments: p.data.num_comments,
      }));

      if (!posts || posts.length === 0) {
        throw new Error('No posts found. Check the subreddit name.');
      }

      // Send posts + API key to our backend for Claude analysis
      setLoadingMsg(`Analyzing ${posts.length} posts with Claude...`);
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ posts, subreddit: sub, apiKey: apiKey.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong.');
      }

      setResult(data.analysis);
      setPostCount(data.postCount);
    } catch (err) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setLoading(false);
      setLoadingMsg('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') analyze();
  };

  const renderResult = (text) => {
    return text.split('\n').map((line, i) => {
      if (line.match(/^\*\*.*\*\*$/) || line.match(/^#+\s/)) {
        return <h3 key={i} className="text-lg font-bold text-white mt-6 mb-2">{line.replace(/\*\*/g, '').replace(/^#+\s/, '')}</h3>;
      }
      if (line.match(/^\d+\.\s\*\*/)) {
        const num = line.match(/^\d+\./)[0];
        const content = line.replace(/^\d+\.\s\*\*/, '').replace(/\*\*/, '');
        return <p key={i} className="font-semibold text-orange-400 mt-4 mb-1">{num} {content}</p>;
      }
      if (line.startsWith('- ') || line.startsWith('* ')) {
        return <li key={i} className="text-gray-300 ml-4 list-disc mb-1">{line.slice(2).replace(/\*\*/g, '')}</li>;
      }
      if (line.trim() === '') return <br key={i} />;
      return <p key={i} className="text-gray-300 mb-1">{line.replace(/\*\*/g, '')}</p>;
    });
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <div className="border-b border-gray-800 px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center gap-3">
          <span className="text-2xl">⛏️</span>
          <div>
            <h1 className="text-xl font-bold">Reddit Pain Miner</h1>
            <p className="text-gray-400 text-sm">Find real problems. Build real products.</p>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-10">
        {/* Input card */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-400 mb-1">Subreddit</label>
            <div className="flex items-center gap-2">
              <span className="text-gray-500 font-mono">r/</span>
              <input
                type="text"
                value={subreddit}
                onChange={(e) => setSubreddit(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="startups, solopreneur, entrepreneur..."
                className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition"
              />
            </div>
          </div>

          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Claude API Key
              <span className="text-gray-500 font-normal ml-2">
                (your key, stays in your browser —{' '}
                <a href="https://console.anthropic.com/" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:underline">
                  get one free
                </a>)
              </span>
            </label>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="sk-ant-..."
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition font-mono text-sm"
            />
          </div>

          <button
            onClick={analyze}
            disabled={loading}
            className="w-full bg-orange-500 hover:bg-orange-400 disabled:bg-gray-700 disabled:text-gray-500 text-white font-semibold py-3 rounded-lg transition flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <span className="animate-spin inline-block">⟳</span>
                {loadingMsg || 'Working...'}
              </>
            ) : (
              <>⛏️ Mine for Pain Points</>
            )}
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-900/30 border border-red-700 rounded-xl p-4 mb-6 text-red-300">
            {error}
          </div>
        )}

        {/* Results */}
        {result && (
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-800">
              <h2 className="font-bold text-lg">Analysis: r/{subreddit.replace(/^r\//, '')}</h2>
              {postCount && (
                <span className="text-sm text-gray-400 bg-gray-800 px-3 py-1 rounded-full">
                  {postCount} posts analyzed
                </span>
              )}
            </div>
            <div className="prose prose-invert max-w-none">
              {renderResult(result)}
            </div>
          </div>
        )}

        {/* Footer */}
        <p className="text-center text-gray-600 text-xs mt-10">
          Your API key never leaves your browser session. Built with Next.js + Claude.
        </p>
      </div>
    </div>
  );
}
