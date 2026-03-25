import { useState } from 'react';
import Link from 'next/link';

const FAQS = [
  {
    q: "What is PainMiner?",
    a: "PainMiner analyzes Reddit communities to surface real pain points, recurring frustrations, and product opportunities. You enter a subreddit, pick a timeframe, and get a structured breakdown of what people are struggling with — ready to inform your next product, marketing campaign, or business idea."
  },
  {
    q: "How does it work?",
    a: "PainMiner fetches the top posts from any subreddit using Reddit's public API, then uses Claude AI to analyze them and extract structured insights: pain points, themes, opportunities, and quotes. The entire analysis runs in under 30 seconds."
  },
  {
    q: "Why do I need a Claude API key?",
    a: "PainMiner uses Claude AI to analyze Reddit posts. During our beta, users supply their own Claude API key so you only pay for what you use. New Anthropic accounts come with free credits — enough to run dozens of analyses. Once we launch paid plans, you won't need your own key."
  },
  {
    q: "Is my API key stored anywhere?",
    a: "No. Your API key is saved only in your browser's localStorage. It is never sent to our servers or stored in any database. You can clear it any time by clearing your browser data."
  },
  {
    q: "What subreddits work best?",
    a: "Any active subreddit with real discussion works well. Great starting points: r/solopreneur, r/startups, r/freelance, r/entrepreneur, r/SaaS, r/webdev, r/personalfinance. The more posts and comments a subreddit has, the richer the analysis."
  },
  {
    q: "How much does it cost to run an analysis?",
    a: "With your own Claude API key, each analysis costs roughly $0.02–0.05 depending on the subreddit size. On paid plans, analysis is included — no key needed."
  },
  {
    q: "What are the pricing plans?",
    a: "We're currently in waitlist/beta mode. When we launch, pricing will start at $9/month for unlimited analyses. Join the waitlist to get early access and a launch discount."
  },
  {
    q: "Is this legal? Are you scraping Reddit?",
    a: "PainMiner uses Reddit's public JSON API — the same data available to anyone visiting Reddit. We only access public posts, link back to all sources, and stay well within normal usage limits. We are not affiliated with or endorsed by Reddit."
  },
  {
    q: "Can I export the results?",
    a: "You can copy the full analysis to your clipboard using the Copy button. CSV and Notion export are on the roadmap for paid plans."
  },
];

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[#1e2a3a] last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-4 text-left gap-4"
      >
        <span className="text-slate-100 text-sm font-medium">{q}</span>
        <span className={`text-slate-500 text-lg transition-transform shrink-0 ${open ? 'rotate-45' : ''}`}>+</span>
      </button>
      {open && (
        <p className="text-slate-400 text-sm leading-relaxed pb-4">{a}</p>
      )}
    </div>
  );
}

export default function FAQ() {
  return (
    <div className="min-h-screen bg-[#0b1120] text-slate-100">
      <nav className="border-b border-[#1e2a3a] px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 w-fit">
            <span className="text-lg">⛏️</span>
            <span className="font-semibold text-slate-100 tracking-tight">PainMiner</span>
          </Link>
          <Link href="/signup" className="text-xs bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded-lg transition font-medium">
            Join waitlist
          </Link>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold text-slate-100 mb-2">Frequently asked questions</h1>
        <p className="text-slate-400 text-sm mb-12">Everything you need to know about PainMiner.</p>

        <div className="bg-[#161c27] border border-[#1e2a3a] rounded-2xl px-6">
          {FAQS.map((faq, i) => <FAQItem key={i} q={faq.q} a={faq.a} />)}
        </div>

        <div className="mt-10 text-center">
          <p className="text-slate-400 text-sm mb-4">Still have questions?</p>
          <a href="mailto:hello@painminer.com" className="text-blue-400 hover:text-blue-300 text-sm transition">
            hello@painminer.com
          </a>
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
