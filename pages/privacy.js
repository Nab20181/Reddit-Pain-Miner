import Link from 'next/link';

const Section = ({ title, children }) => (
  <div className="mb-8">
    <h2 className="text-lg font-semibold text-slate-100 mb-3">{title}</h2>
    <div className="text-slate-400 text-sm leading-relaxed space-y-2">{children}</div>
  </div>
);

export default function Privacy() {
  return (
    <div className="min-h-screen bg-[#0b1120] text-slate-100">
      <nav className="border-b border-[#1e2a3a] px-6 py-4">
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="flex items-center gap-2.5 w-fit">
            <span className="text-lg">⛏️</span>
            <span className="font-semibold text-slate-100 tracking-tight">PainMiner</span>
          </Link>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold text-slate-100 mb-2">Privacy Policy</h1>
        <p className="text-slate-500 text-sm mb-12">Last updated: March 2026</p>

        <Section title="Overview">
          <p>PainMiner ("we", "us", "our") is committed to protecting your privacy. This policy explains what data we collect, how we use it, and your rights.</p>
        </Section>

        <Section title="Data We Collect">
          <p><strong className="text-slate-300">Waitlist email:</strong> If you join our waitlist, we store your email address to notify you at launch. Nothing else.</p>
          <p><strong className="text-slate-300">API keys:</strong> Your Claude API key is stored only in your browser's localStorage. It is never transmitted to our servers or stored by us.</p>
          <p><strong className="text-slate-300">Usage data:</strong> We may collect anonymous usage analytics (page views, feature usage) to improve the product. No personally identifiable information is attached.</p>
        </Section>

        <Section title="Data We Don't Collect">
          <p>We do not store your search queries, subreddit inputs, or analysis results. Each analysis is processed in real time and discarded. We have no database of your activity.</p>
        </Section>

        <Section title="Third-Party Services">
          <p><strong className="text-slate-300">Reddit:</strong> Analysis fetches public post data from Reddit's public API. We are not affiliated with Reddit.</p>
          <p><strong className="text-slate-300">Anthropic (Claude):</strong> Analysis is processed via the Claude API using your own API key. Anthropic's privacy policy governs their handling of API requests.</p>
          <p><strong className="text-slate-300">Vercel:</strong> Our app is hosted on Vercel. Standard server logs (IP addresses, request times) may be retained by Vercel per their privacy policy.</p>
        </Section>

        <Section title="Cookies">
          <p>We do not use tracking cookies. We use localStorage to persist your API key on your device for convenience.</p>
        </Section>

        <Section title="Your Rights">
          <p>If you've joined our waitlist and want your email removed, contact us and we will delete it immediately.</p>
        </Section>

        <Section title="Contact">
          <p>Questions? Email us at <span className="text-blue-400">hello@painminer.com</span></p>
        </Section>
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
