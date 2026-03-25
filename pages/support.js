import Link from 'next/link';

function Footer() {
  return (
    <footer className="border-t border-[#1e2a3a] px-6 py-8 mt-8">
      <div className="max-w-4xl mx-auto flex flex-wrap gap-4 justify-center text-xs text-slate-500">
        <Link href="/" className="hover:text-slate-300 transition">Home</Link>
        <Link href="/pricing" className="hover:text-slate-300 transition">Pricing</Link>
        <Link href="/faq" className="hover:text-slate-300 transition">FAQ</Link>
        <Link href="/contact" className="hover:text-slate-300 transition">Contact</Link>
        <Link href="/privacy" className="hover:text-slate-300 transition">Privacy</Link>
        <Link href="/tos" className="hover:text-slate-300 transition">Terms</Link>
      </div>
    </footer>
  );
}

const SECTIONS = [
  {
    icon: '🚀',
    title: 'Getting started',
    articles: [
      { title: 'What is Subtext?', body: 'Subtext analyzes Reddit communities to surface real pain points, product opportunities, and marketing-ready quotes. Enter any subreddit, pick a timeframe, and get structured AI insights in under 30 seconds.' },
      { title: 'How to run your first analysis', body: 'Go to the app, type a subreddit name (without the r/ prefix), select a timeframe, enter your Claude API key, and click "Read the Subtext". Results appear in seconds.' },
      { title: 'Getting a Claude API key', body: 'Visit console.anthropic.com, create a free account, and generate an API key under "API Keys". New accounts receive free credits — enough for dozens of analyses. Your key is stored locally in your browser and never sent to our servers.' },
    ],
  },
  {
    icon: '⚙️',
    title: 'Using the app',
    articles: [
      { title: 'What subreddits work best?', body: 'Any active subreddit with real discussion works. Great options: r/solopreneur, r/startups, r/freelance, r/entrepreneur, r/SaaS, r/personalfinance. The more posts a subreddit has, the richer the analysis.' },
      { title: 'What do the timeframes mean?', body: '1 Week pulls the top posts from the last 7 days. 1 Month pulls the last 30 days. 3 Months pulls the last 90 days. All Time pulls the highest-rated posts ever. Shorter timeframes catch trending problems; longer ones show persistent pain.' },
      { title: 'What are the intensity levels?', body: 'High intensity means the problem comes up frequently and generates strong emotional responses. Medium means it\'s recurring but less severe. Low means it\'s real but less urgent. These are relative within the subreddit analyzed.' },
      { title: 'How do source post links work?', body: 'Each pain point links to the Reddit threads that support it, so you can verify the insight yourself. Click any source chip to open the original post on Reddit.' },
    ],
  },
  {
    icon: '💳',
    title: 'Billing & plans',
    articles: [
      { title: 'What\'s included in the free plan?', body: 'The free plan gives you 3 analyses per day with your own Claude API key. You see the top 2 pain points. It\'s a great way to evaluate the tool before upgrading.' },
      { title: 'What\'s in Pro ($9/mo)?', body: 'Pro gives you unlimited analyses using your own Claude API key, plus the full breakdown: all 5 pain points, themes, opportunities, quotes, and source links.' },
      { title: 'What\'s in Pro+ ($12.99/mo)?', body: 'Pro+ includes everything in Pro, but you use our Claude API key — no setup required. Includes 100 analyses per month.' },
      { title: 'How do I cancel?', body: 'You can cancel anytime from your account settings. No questions asked. Your access continues until the end of your billing period.' },
    ],
  },
  {
    icon: '🔧',
    title: 'Troubleshooting',
    articles: [
      { title: 'I\'m getting a Claude API error', body: 'Check that your API key starts with "sk-ant-" and was copied completely. Also verify your Anthropic account has credits remaining at console.anthropic.com. If you\'re on a free tier, you may hit rate limits — wait a minute and try again.' },
      { title: 'Subreddit not found error', body: 'Make sure the subreddit name is spelled correctly and the community is public. Private or quarantined subreddits cannot be accessed. Try without the "r/" prefix.' },
      { title: 'Analysis returned empty or weird results', body: 'This can happen with very small subreddits (fewer than 10 posts) or highly niche communities where post titles are cryptic. Try a larger timeframe or a more active subreddit.' },
      { title: 'My API key isn\'t saving', body: 'Subtext saves your key in localStorage. If it\'s not persisting, check that your browser isn\'t clearing localStorage on close, or that you\'re not in private/incognito mode.' },
    ],
  },
];

function Article({ title, body }) {
  return (
    <div className="border-b border-[#1e2a3a] last:border-0 py-4">
      <h3 className="text-slate-100 text-sm font-medium mb-1">{title}</h3>
      <p className="text-slate-400 text-sm leading-relaxed">{body}</p>
    </div>
  );
}

export default function Support() {
  return (
    <div className="min-h-screen bg-[#0b1120] text-slate-100">
      <nav className="border-b border-[#1e2a3a] px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="text-lg">⛏️</span>
            <span className="font-semibold text-slate-100 tracking-tight">Subtext</span>
          </Link>
          <Link href="/contact" className="text-xs bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded-lg transition font-medium">
            Contact us
          </Link>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-slate-100 mb-2">Help Center</h1>
          <p className="text-slate-400 text-sm">Everything you need to get the most out of Subtext.</p>
        </div>

        {/* Quick links */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-12">
          {SECTIONS.map(s => (
            <a
              key={s.title}
              href={`#${s.title.toLowerCase().replace(/\s+/g, '-')}`}
              className="bg-[#161c27] border border-[#1e2a3a] rounded-xl p-3 text-center hover:border-blue-500/30 transition"
            >
              <span className="text-xl block mb-1">{s.icon}</span>
              <span className="text-slate-300 text-xs font-medium">{s.title}</span>
            </a>
          ))}
        </div>

        {/* Sections */}
        <div className="space-y-8">
          {SECTIONS.map(section => (
            <div
              key={section.title}
              id={section.title.toLowerCase().replace(/\s+/g, '-')}
              className="bg-[#161c27] border border-[#1e2a3a] rounded-2xl p-6"
            >
              <div className="flex items-center gap-3 mb-4 pb-4 border-b border-[#1e2a3a]">
                <span className="text-2xl">{section.icon}</span>
                <h2 className="text-slate-100 font-semibold">{section.title}</h2>
              </div>
              <div>
                {section.articles.map((a, i) => <Article key={i} title={a.title} body={a.body} />)}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 bg-[#161c27] border border-[#1e2a3a] rounded-2xl p-6 text-center">
          <p className="text-slate-300 font-medium mb-1">Still need help?</p>
          <p className="text-slate-400 text-sm mb-4">We read every message and reply within 24 hours.</p>
          <Link href="/contact" className="inline-block bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold px-6 py-2.5 rounded-xl transition">
            Contact support →
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}

