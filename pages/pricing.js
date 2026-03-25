import Link from 'next/link';

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Try before you buy.',
    features: [
      '3 analyses per day',
      'Top 2 pain points only',
      'Source post links',
      'Bring your own Claude API key',
    ],
    cta: 'Try for free',
    ctaHref: '/app',
    highlight: false,
  },
  {
    name: 'Pro',
    price: '$19',
    period: 'per month',
    description: 'For founders and researchers.',
    features: [
      'Unlimited analyses',
      'Full pain point breakdown',
      'Recurring themes + opportunities',
      'Quotes ready for landing pages',
      'All timeframes',
      'Bring your own Claude API key',
      'CSV export (coming soon)',
      'Priority support',
    ],
    cta: 'Join waitlist',
    ctaHref: '/signup',
    highlight: false,
  },
  {
    name: 'Pro+',
    price: '$29',
    period: 'per month',
    description: 'Everything in Pro, zero setup.',
    features: [
      'Everything in Pro',
      'No API key needed — we handle it',
      '150 analyses per month included',
      'Fastest response times',
      'Priority support',
    ],
    cta: 'Join waitlist',
    ctaHref: '/signup',
    highlight: true,
  },
  {
    name: 'Team',
    price: '$79',
    period: 'per month',
    description: 'For product teams.',
    features: [
      'Everything in Pro+',
      'Up to 5 seats',
      'Multi-subreddit comparison',
      'Trend tracking over time',
      'CSV + Notion export',
      'API access',
      'Dedicated support',
    ],
    cta: 'Join waitlist',
    ctaHref: '/signup',
    highlight: false,
  },
];

export default function Pricing() {
  return (
    <div className="min-h-screen bg-[#0b1120] text-slate-100">
      <nav className="border-b border-[#1e2a3a] px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 w-fit">
            <span className="text-lg">⛏️</span>
            <span className="font-semibold text-slate-100 tracking-tight">Subtext</span>
          </Link>
          <Link href="/signup" className="text-xs bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded-lg transition font-medium">
            Join waitlist
          </Link>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-slate-100 mb-3">Simple pricing</h1>
          <p className="text-slate-400 text-base max-w-md mx-auto">
            Start free. Upgrade when you need more. No hidden fees, no surprises.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl p-6 flex flex-col ${
                plan.highlight
                  ? 'bg-blue-600/10 border-2 border-blue-500/40'
                  : 'bg-[#161c27] border border-[#1e2a3a]'
              }`}
            >
              {plan.highlight && (
                <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-3">
                  Most popular
                </div>
              )}
              <div className="mb-4">
                <h2 className="text-lg font-bold text-slate-100">{plan.name}</h2>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-3xl font-bold text-slate-100">{plan.price}</span>
                  <span className="text-slate-500 text-sm">/{plan.period}</span>
                </div>
                <p className="text-slate-400 text-xs mt-1">{plan.description}</p>
              </div>

              <ul className="space-y-2 mb-6 flex-1">
                {plan.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                    <span className="text-blue-400 mt-0.5 shrink-0">✓</span>
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                href={plan.ctaHref}
                className={`w-full text-center py-2.5 rounded-xl text-sm font-semibold transition ${
                  plan.highlight
                    ? 'bg-blue-600 hover:bg-blue-500 text-white'
                    : 'bg-[#1e2a3a] hover:bg-[#243040] text-slate-200'
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        {/* Refund policy */}
        <div className="mt-8 bg-[#161c27] border border-[#1e2a3a] rounded-2xl p-5 text-center">
          <p className="text-slate-300 text-sm font-medium mb-1">Cancel anytime. No refunds.</p>
          <p className="text-slate-500 text-xs leading-relaxed max-w-md mx-auto">
            You can cancel your subscription at any time — access continues until the end of your billing period. All sales are final. Having an issue? <a href="mailto:hello@Subtext.com" className="text-blue-400 hover:text-blue-300 transition">Contact us</a> and we'll make it right.
          </p>
        </div>

        {/* FAQ teaser */}
        <div className="mt-6 text-center">
          <p className="text-slate-400 text-sm">
            Questions?{' '}
            <Link href="/faq" className="text-blue-400 hover:text-blue-300 transition">
              Check the FAQ
            </Link>{' '}
            or email{' '}
            <a href="mailto:hello@Subtext.com" className="text-blue-400 hover:text-blue-300 transition">
              hello@Subtext.com
            </a>
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t border-[#1e2a3a] px-6 py-8 mt-8">
      <div className="max-w-4xl mx-auto flex flex-wrap gap-4 justify-center text-xs text-slate-500">
        <Link href="/" className="hover:text-slate-300 transition">Home</Link>
        <Link href="/pricing" className="hover:text-slate-300 transition">Pricing</Link>
        <Link href="/faq" className="hover:text-slate-300 transition">FAQ</Link>
        <Link href="/privacy" className="hover:text-slate-300 transition">Privacy</Link>
        <Link href="/tos" className="hover:text-slate-300 transition">Terms</Link>
      </div>
    </footer>
  );
}


