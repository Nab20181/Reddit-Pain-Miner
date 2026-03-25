import { useState } from 'react';

const TIMEFRAMES = [
  { label: '1 Week', value: 'week' },
  { label: '1 Month', value: 'month' },
  { label: '3 Months', value: 'year' },
  { label: 'All Time', value: 'all' },
];

const INTENSITY_COLOR = {
  high: 'bg-red-500/10 text-red-400 border-red-500/20',
  medium: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  low: 'bg-green-500/10 text-green-400 border-green-500/20',
};

function Badge({ label, color }) {
  return (
    <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${color}`}>
      {label}
    </span>
  );
}

function Card({ children, className = '' }) {
  return (
    <div className={`bg-white/[0.03] border border-white/[0.08] rounded-2xl p-5 ${className}`}>
      {children}
    </div>
  );
}

function SectionHeader({ icon, title, subtitle }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="text-xl">{icon}</span>
      <div>
        <h2 className="font-semibold text-white text-base">{title}</h2>
        {subtitle && <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>}
      </div>
    </div>
  );
}

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={copy}
      className="text-xs text-gray-500 hover:text-gray-300 transition flex items-center gap-1"
    >
      {copied ? '✓ Copied' : 'Copy'}
    </button>
  );
}

export default function Home() {
  const [subreddit, setSubreddit] = useState('');
  const [apiKey, setApiKey] = useState(
    typeof window !== 'undefined' ? localStorage.getItem('pm_api_key') || '' : ''
  );
  const [timeframe, setTimeframe] = useState('month');
  const [loading, setLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState(null);
  const [posts, setPosts] = useState([]);
  const [analyzedSub, setAnalyzedSub] = useState('');

  const analyze = async () => {
    if (!subreddit.trim() || !apiKey.trim()) {
      setError('Please enter a subreddit and your Claude API key.');
      return;
    }

    setLoading(true);
    setAnalysis(null);
    setError(null);
    setPosts([]);

    const sub = subreddit.trim().replace(/^r\//, '');

    try {
      setLoadingMsg('Fetching posts from Reddit...');
      const redditRes = await fetch(
        `https://www.reddit.com/r/${sub}/top.json?limit=50&t=${timeframe}`,
        { headers: { Accept: 'application/json' } }
      );

      if (!redditRes.ok) throw new Error(`Subreddit not found or private (${redditRes.status})`);

      const redditData = await redditRes.json();
      const fetchedPosts = redditData.data.children.map(p => ({
        title: p.data.title,
        selftext: p.data.selftext?.slice(0, 150) || '',
        score: p.data.score,
        num_comments: p.data.num_comments,
        url: `https://reddit.com${p.data.permalink}`,
      }));

      if (!fetchedPosts.length) throw new Error('No posts found. Check the subreddit name.');

      setPosts(fetchedPosts);
      setLoadingMsg(`Analyzing ${fetchedPosts.length} posts...`);

      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ posts: fetchedPosts.slice(0, 25), subreddit: sub, apiKey: apiKey.trim() }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Something went wrong.');

      setAnalysis(data.analysis);
      setAnalyzedSub(sub);
    } catch (err) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setLoading(false);
      setLoadingMsg('');
    }
  };

  const fullText = analysis ? JSON.stringify(analysis, null, 2) : '';
  const serverKeyConfigured = process.env.NEXT_PUBLIC_HAS_SERVER_KEY === 'true';

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans">

      {/* Nav */}
      <nav className="border-b border-white/[0.06] px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="text-lg">⛏️</span>
            <span className="font-semibold text-white tracking-tight">PainMiner</span>
          </div>
          <a
            href="https://console.anthropic.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-gray-500 hover:text-gray-300 transition"
          >
            Get Claude API key →
          </a>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-16">

        {/* Hero */}
        {!analysis && (
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight mb-3">
              Find what people{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
                actually want
              </span>
            </h1>
            <p className="text-gray-400 text-lg max-w-xl mx-auto">
              Analyze any subreddit and surface real pain points, product opportunities, and quotes — ready for your next build.
            </p>
          </div>
        )}

        {/* Input card */}
        <Card className="mb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wider">Subreddit</label>
              <div className="flex items-center bg-white/[0.05] border border-white/[0.1] rounded-xl overflow-hidden focus-within:border-orange-500/60 transition">
                <span className="pl-3 text-gray-500 text-sm select-none">r/</span>
                <input
                  type="text"
                  value={subreddit}
                  onChange={e => setSubreddit(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && analyze()}
                  placeholder="solopreneur"
                  className="flex-1 bg-transparent px-2 py-2.5 text-white placeholder-gray-600 text-sm focus:outline-none"
                />
              </div>
            </div>
            {!serverKeyConfigured && (
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wider">Claude API Key</label>
                <input
                  type="password"
                  value={apiKey}
                  onChange={e => { setApiKey(e.target.value); localStorage.setItem('pm_api_key', e.target.value); }}
                  onKeyDown={e => e.key === 'Enter' && analyze()}
                  placeholder="sk-ant-..."
                  className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl px-3 py-2.5 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-orange-500/60 transition font-mono"
                />
              </div>
            )}
          </div>

          {/* Timeframe */}
          <div className="mb-5">
            <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wider">Timeframe</label>
            <div className="flex gap-2 flex-wrap">
              {TIMEFRAMES.map(tf => (
                <button
                  key={tf.value}
                  onClick={() => setTimeframe(tf.value)}
                  className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition ${
                    timeframe === tf.value
                      ? 'bg-orange-500 text-white'
                      : 'bg-white/[0.05] text-gray-400 hover:text-white hover:bg-white/[0.08]'
                  }`}
                >
                  {tf.label}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={analyze}
            disabled={loading}
            className="w-full bg-orange-500 hover:bg-orange-400 active:bg-orange-600 disabled:bg-white/[0.06] disabled:text-gray-600 text-white font-semibold py-3 rounded-xl transition text-sm flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                </svg>
                {loadingMsg || 'Working...'}
              </>
            ) : (
              'Mine for Pain Points'
            )}
          </button>
        </Card>

        {/* Error */}
        {error && (
          <div className="border border-red-500/20 bg-red-500/10 rounded-xl p-4 mb-6 text-red-400 text-sm">
            {error}
          </div>
        )}

        {/* Results */}
        {analysis && (
          <div className="space-y-4 mt-8">

            {/* Header row */}
            <div className="flex items-center justify-between mb-2">
              <div>
                <h2 className="font-semibold text-white">r/{analyzedSub}</h2>
                <p className="text-xs text-gray-500 mt-0.5">{posts.length} posts · {TIMEFRAMES.find(t => t.value === timeframe)?.label}</p>
              </div>
              <CopyButton text={fullText} />
            </div>

            {/* Summary */}
            {analysis.summary && (
              <Card className="border-orange-500/20 bg-orange-500/5">
                <p className="text-gray-300 text-sm leading-relaxed">{analysis.summary}</p>
              </Card>
            )}

            {/* Pain Points */}
            {analysis.painPoints?.length > 0 && (
              <Card>
                <SectionHeader icon="🔥" title="Pain Points" subtitle="Ranked by intensity" />
                <div className="space-y-3">
                  {analysis.painPoints.map((p, i) => (
                    <div key={i} className="flex gap-3 items-start">
                      <span className="text-gray-600 text-sm font-mono mt-0.5 w-4 shrink-0">{i + 1}</span>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-white text-sm font-medium">{p.title}</span>
                          {p.intensity && (
                            <Badge
                              label={p.intensity}
                              color={INTENSITY_COLOR[p.intensity] || INTENSITY_COLOR.medium}
                            />
                          )}
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed">{p.description}</p>
                        {p.sources?.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-2">
                            {p.sources.map((srcIdx) => {
                              const post = posts[srcIdx - 1];
                              if (!post) return null;
                              return (
                                <a
                                  key={srcIdx}
                                  href={post.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 text-xs text-gray-500 hover:text-orange-400 bg-white/[0.04] hover:bg-white/[0.07] border border-white/[0.08] rounded-lg px-2 py-1 transition"
                                >
                                  <span>#{srcIdx}</span>
                                  <span className="max-w-[160px] truncate">{post.title}</span>
                                  <span>↗</span>
                                </a>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Two column: Themes + Opportunities */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {analysis.themes?.length > 0 && (
                <Card>
                  <SectionHeader icon="🔁" title="Recurring Themes" />
                  <div className="space-y-3">
                    {analysis.themes.map((t, i) => (
                      <div key={i}>
                        <p className="text-white text-sm font-medium">{t.theme}</p>
                        <p className="text-gray-400 text-xs mt-0.5 leading-relaxed">{t.detail}</p>
                      </div>
                    ))}
                  </div>
                </Card>
              )}

              {analysis.opportunities?.length > 0 && (
                <Card>
                  <SectionHeader icon="💡" title="Opportunities" />
                  <div className="space-y-3">
                    {analysis.opportunities.map((o, i) => (
                      <div key={i}>
                        <p className="text-white text-sm font-medium">{o.idea}</p>
                        <p className="text-gray-400 text-xs mt-0.5 leading-relaxed">{o.why}</p>
                      </div>
                    ))}
                  </div>
                </Card>
              )}
            </div>

            {/* Quotes */}
            {analysis.quotes?.length > 0 && (
              <Card>
                <SectionHeader icon="💬" title="Quotes to Save" subtitle="Ready for landing pages & ads" />
                <div className="space-y-3">
                  {analysis.quotes.map((q, i) => (
                    <div key={i} className="border-l-2 border-orange-500/30 pl-4">
                      <p className="text-gray-200 text-sm italic">"{q.text}"</p>
                      <p className="text-gray-500 text-xs mt-1">{q.why}</p>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Source Posts */}
            <Card>
              <SectionHeader icon="📋" title="Source Posts" subtitle="Click to verify on Reddit" />
              <div className="space-y-1">
                {posts.map((post, i) => (
                  <a
                    key={i}
                    href={post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-white/[0.04] transition group"
                  >
                    <span className="text-gray-600 text-xs font-mono w-5 shrink-0 text-right">{i + 1}</span>
                    <p className="flex-1 text-gray-400 group-hover:text-gray-200 text-sm truncate transition">{post.title}</p>
                    <span className="text-gray-600 text-xs shrink-0">↑{post.score.toLocaleString()}</span>
                    <span className="text-gray-700 group-hover:text-orange-400 text-xs transition">↗</span>
                  </a>
                ))}
              </div>
            </Card>

          </div>
        )}

        <p className="text-center text-gray-700 text-xs mt-12">
          API keys stay in your browser session only · Built with Next.js + Claude
        </p>
      </div>
    </div>
  );
}
