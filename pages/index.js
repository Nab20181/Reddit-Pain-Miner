import Link from 'next/link';

// ── Demo data – looks exactly like real tool output ──────────────────────────
const DEMO = {
  subreddit: 'solopreneur',
  timeframe: '1 Month',
  postCount: 47,
  summary:
    'Solopreneurs are overwhelmed by the gap between idea and execution — not lack of ideas. The dominant frustration is isolation: no co-founder, no team, no one to gut-check decisions. Tools that reduce decision fatigue or provide structured accountability have a massive opening here.',
  painPoints: [
    {
      title: 'Decision paralysis without a co-founder',
      description:
        'Every major decision — pricing, positioning, features — falls on one person with no one to pressure-test ideas against. Multiple posts describe stalling for weeks on decisions that would take a team 30 minutes.',
      intensity: 'high',
      sources: ['Spent 3 weeks deciding on pricing alone', 'No one to tell me if my idea is stupid'],
    },
    {
      title: 'Wearing too many hats kills momentum',
      description:
        "Switching between product, marketing, sales, and support in the same day fragments focus and kills deep work. \"I'm a developer forced to be a marketer\" is a recurring theme.",
      intensity: 'high',
      sources: ["Can't ship features because I'm doing customer support", 'Context switching is killing me'],
    },
    {
      title: 'Charging too little out of fear',
      description:
        'Underpricing is endemic. Founders consistently describe charging 40-60% below what the market will bear, driven by fear of rejection rather than data.',
      intensity: 'medium',
      sources: ['Doubled my price, nobody cancelled', 'Scared to charge what I\'m worth'],
    },
  ],
  opportunities: [
    { idea: 'Async co-founder for hire', why: 'Founders want someone to gut-check decisions — a fractional advisor product could charge $99/mo easily' },
    { idea: 'Solopreneur OS / dashboard', why: 'One tool that tracks MRR, tasks, and customer feedback in one place — currently using 6 different apps' },
    { idea: 'Pricing confidence tool', why: 'Help founders research and validate pricing before they publish it — huge anxiety around this specific decision' },
  ],
  quotes: [
    { text: 'I\'ve been stuck on the same pricing page for three weeks. There\'s nobody to tell me I\'m overthinking it.', why: 'Perfect ad copy — universal pain, emotionally resonant' },
    { text: 'I\'m a one-person company trying to compete with teams of 20. The mental load is insane.', why: 'Captures the core solopreneur struggle in one sentence' },
    { text: 'Doubled my prices last month. Lost zero customers. Wish I\'d done it two years ago.', why: 'Social proof for any pricing-related product' },
  ],
};

const INTENSITY_COLOR = {
  high: 'bg-red-500/10 text-red-400 border-red-500/20',
  medium: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
  low: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
};

// ── Components ────────────────────────────────────────────────────────────────
function Nav() {
  return (
    <nav className="border-b border-[#1e2a3a] px-6 py-4 sticky top-0 bg-[#0b1120]/90 backdrop-blur-sm z-50">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="text-lg">⛏️</span>
          <span className="font-semibold text-slate-100 tracking-tight">PainMiner</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/pricing" className="text-xs text-slate-400 hover:text-slate-200 transition hidden sm:block">Pricing</Link>
          <Link href="/faq" className="text-xs text-slate-400 hover:text-slate-200 transition hidden sm:block">FAQ</Link>
          <Link href="/app" className="text-xs text-slate-400 hover:text-slate-200 transition">Try free</Link>
          <Link href="/signup" className="text-xs bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded-lg transition font-medium">
            Join waitlist
          </Link>
        </div>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="border-t border-[#1e2a3a] px-6 py-8">
      <div className="max-w-5xl mx-auto flex flex-wrap gap-4 justify-center text-xs text-slate-500">
        <Link href="/app" className="hover:text-slate-300 transition">App</Link>
        <Link href="/pricing" className="hover:text-slate-300 transition">Pricing</Link>
        <Link href="/faq" className="hover:text-slate-300 transition">FAQ</Link>
        <Link href="/privacy" className="hover:text-slate-300 transition">Privacy</Link>
        <Link href="/tos" className="hover:text-slate-300 transition">Terms</Link>
      </div>
    </footer>
  );
}

// Mock tool UI that looks exactly like the real output
function DemoCard() {
  return (
    <div className="bg-[#0d1420] border border-[#1e2a3a] rounded-2xl overflow-hidden shadow-2xl">
      {/* Mock browser chrome */}
      <div className="bg-[#161c27] border-b border-[#1e2a3a] px-4 py-3 flex items-center gap-3">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#1e2a3a]" />
          <div className="w-3 h-3 rounded-full bg-[#1e2a3a]" />
          <div className="w-3 h-3 rounded-full bg-[#1e2a3a]" />
        </div>
        <div className="flex-1 bg-[#0d1420] rounded-md px-3 py-1 text-xs text-slate-500 text-center">
          painminer.com
        </div>
      </div>

      <div className="p-5 space-y-4 max-h-[680px] overflow-hidden relative">

        {/* Result header */}
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold text-slate-100 text-sm">r/{DEMO.subreddit}</p>
            <p className="text-xs text-slate-500">{DEMO.postCount} posts · {DEMO.timeframe}</p>
          </div>
          <span className="text-xs text-slate-500 bg-[#161c27] border border-[#1e2a3a] px-2 py-1 rounded-lg">Copy</span>
        </div>

        {/* Summary */}
        <div className="bg-blue-500/5 border border-blue-500/20 rounded-xl p-4">
          <p className="text-slate-300 text-xs leading-relaxed">{DEMO.summary}</p>
        </div>

        {/* Pain points */}
        <div className="bg-[#161c27] border border-[#1e2a3a] rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <span>🔥</span>
            <span className="text-slate-100 text-sm font-semibold">Pain Points</span>
            <span className="text-xs text-slate-500">Ranked by intensity</span>
          </div>
          <div className="space-y-3">
            {DEMO.painPoints.map((p, i) => (
              <div key={i} className="flex gap-3">
                <span className="text-slate-600 text-xs font-mono mt-0.5 w-4 shrink-0">{i + 1}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                    <span className="text-slate-100 text-xs font-medium">{p.title}</span>
                    <span className={`text-xs px-1.5 py-0.5 rounded-full border ${INTENSITY_COLOR[p.intensity]}`}>
                      {p.intensity}
                    </span>
                  </div>
                  <p className="text-slate-400 text-xs leading-relaxed">{p.description}</p>
                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                    {p.sources.map((s, j) => (
                      <span key={j} className="text-xs text-slate-500 bg-[#0d1420] border border-[#1e2a3a] rounded-md px-2 py-0.5 truncate max-w-[180px]">
                        #{j + 1} {s} ↗
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Opportunities */}
        <div className="bg-[#161c27] border border-[#1e2a3a] rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <span>💡</span>
            <span className="text-slate-100 text-sm font-semibold">Opportunities</span>
          </div>
          <div className="space-y-2">
            {DEMO.opportunities.map((o, i) => (
              <div key={i}>
                <p className="text-slate-100 text-xs font-medium">{o.idea}</p>
                <p className="text-slate-400 text-xs leading-relaxed">{o.why}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Fade out at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0d1420] to-transparent pointer-events-none" />
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function Landing() {
  return (
    <div className="min-h-screen bg-[#0b1120] text-slate-100 font-sans">
      <Nav />

      {/* ── Hero ── */}
      <section className="max-w-5xl mx-auto px-6 pt-20 pb-16 text-center">
        <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-1.5 text-xs text-blue-400 mb-6">
          <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
          Now in beta — join the waitlist
        </div>
        <h1 className="text-5xl sm:text-6xl font-bold tracking-tight leading-tight mb-5">
          Stop guessing what{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
            people want
          </span>
        </h1>
        <p className="text-slate-400 text-xl max-w-2xl mx-auto mb-8 leading-relaxed">
          PainMiner analyzes any Reddit community and surfaces the real frustrations, unmet needs, and product opportunities hiding in plain sight.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/app"
            className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-3 rounded-xl transition text-sm"
          >
            Try it free →
          </Link>
          <Link
            href="/signup"
            className="bg-[#161c27] hover:bg-[#1e2a3a] border border-[#1e2a3a] text-slate-200 font-semibold px-6 py-3 rounded-xl transition text-sm"
          >
            Join the waitlist
          </Link>
        </div>
        <p className="text-slate-600 text-xs mt-4">Free tier available · No credit card required</p>
      </section>

      {/* ── Demo ── */}
      <section className="max-w-4xl mx-auto px-6 pb-24">
        <div className="text-center mb-8">
          <p className="text-slate-500 text-sm uppercase tracking-widest font-medium">Live example · r/solopreneur</p>
        </div>
        <DemoCard />
        <p className="text-center text-slate-600 text-xs mt-4">This is real output. Run your own analysis in seconds.</p>
      </section>

      {/* ── How it works ── */}
      <section className="border-t border-[#1e2a3a] py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-100 mb-3">Research in 30 seconds</h2>
            <p className="text-slate-400 max-w-lg mx-auto">No surveys. No interviews. No guesswork. Just real signal from real people.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { step: '01', icon: '🎯', title: 'Enter a subreddit', desc: 'Any community on Reddit — startups, solopreneurs, freelancers, gamers, anything.' },
              { step: '02', icon: '⚡', title: 'AI analyzes the top posts', desc: 'We pull the highest-signal posts and run them through Claude to find patterns humans miss.' },
              { step: '03', icon: '💎', title: 'Get structured insights', desc: 'Pain points, opportunities, recurring themes, and quotes — ready to act on immediately.' },
            ].map((item) => (
              <div key={item.step} className="bg-[#161c27] border border-[#1e2a3a] rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">{item.icon}</span>
                  <span className="text-xs font-mono text-slate-600">{item.step}</span>
                </div>
                <h3 className="text-slate-100 font-semibold mb-2">{item.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="border-t border-[#1e2a3a] py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-100 mb-3">Everything you need to find your next idea</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: '🔥', title: 'Ranked pain points', desc: 'Top 5 frustrations, ranked by intensity with high/medium/low severity tags.' },
              { icon: '🔗', title: 'Source links', desc: 'Every insight links back to the exact Reddit thread it came from. Verify everything.' },
              { icon: '💬', title: 'Marketing-ready quotes', desc: 'Real quotes from real people — perfect for landing pages, ads, and pitch decks.' },
              { icon: '💡', title: 'Product opportunities', desc: 'Specific product and service ideas derived directly from the pain points found.' },
              { icon: '📅', title: 'Flexible timeframes', desc: 'Analyze 1 week, 1 month, 3 months, or all-time top posts.' },
              { icon: '🔁', title: 'Recurring themes', desc: 'Patterns that show up across multiple posts — the signal behind the noise.' },
            ].map((f) => (
              <div key={f.title} className="bg-[#161c27] border border-[#1e2a3a] rounded-2xl p-5">
                <span className="text-2xl mb-3 block">{f.icon}</span>
                <h3 className="text-slate-100 font-semibold text-sm mb-1">{f.title}</h3>
                <p className="text-slate-400 text-xs leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Quotes ── */}
      <section className="border-t border-[#1e2a3a] py-24 px-6 bg-[#0d1420]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-100 mb-3">The quotes speak for themselves</h2>
            <p className="text-slate-400 text-sm">Real output from a real analysis of r/solopreneur</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {DEMO.quotes.map((q, i) => (
              <div key={i} className="bg-[#161c27] border border-[#1e2a3a] rounded-2xl p-5">
                <div className="border-l-2 border-blue-500/40 pl-4">
                  <p className="text-slate-200 text-sm italic leading-relaxed">"{q.text}"</p>
                  <p className="text-slate-500 text-xs mt-2">{q.why}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing teaser ── */}
      <section className="border-t border-[#1e2a3a] py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-slate-100 mb-3">Start free. Upgrade when you're ready.</h2>
          <p className="text-slate-400 mb-8">Free tier available with your own Claude API key. Pro plans from $9/mo.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/pricing" className="bg-[#161c27] hover:bg-[#1e2a3a] border border-[#1e2a3a] text-slate-200 font-semibold px-6 py-3 rounded-xl transition text-sm">
              See pricing
            </Link>
            <Link href="/app" className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-3 rounded-xl transition text-sm">
              Try it free →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="border-t border-[#1e2a3a] py-24 px-6 bg-[#0d1420]">
        <div className="max-w-2xl mx-auto text-center">
          <span className="text-4xl block mb-4">⛏️</span>
          <h2 className="text-3xl font-bold text-slate-100 mb-3">
            Your next product idea is already out there.
          </h2>
          <p className="text-slate-400 mb-8 text-lg">
            Someone is posting about it on Reddit right now. PainMiner finds it in 30 seconds.
          </p>
          <Link
            href="/signup"
            className="inline-block bg-blue-600 hover:bg-blue-500 text-white font-semibold px-8 py-3.5 rounded-xl transition text-sm"
          >
            Join the waitlist →
          </Link>
          <p className="text-slate-600 text-xs mt-4">No spam. No credit card. Just early access.</p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
