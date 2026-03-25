import Link from 'next/link';

const Section = ({ title, children }) => (
  <div className="mb-8">
    <h2 className="text-lg font-semibold text-slate-100 mb-3">{title}</h2>
    <div className="text-slate-400 text-sm leading-relaxed space-y-2">{children}</div>
  </div>
);

export default function TOS() {
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
        <h1 className="text-3xl font-bold text-slate-100 mb-2">Terms of Service</h1>
        <p className="text-slate-500 text-sm mb-12">Last updated: March 2026</p>

        <Section title="Acceptance">
          <p>By using PainMiner, you agree to these terms. If you don't agree, don't use the service.</p>
        </Section>

        <Section title="What PainMiner Is">
          <p>PainMiner is a research tool that analyzes publicly available Reddit data to surface market insights. It is provided for informational and research purposes only.</p>
        </Section>

        <Section title="Acceptable Use">
          <p>You agree not to:</p>
          <ul className="list-disc ml-4 space-y-1">
            <li>Use PainMiner for any illegal purpose</li>
            <li>Attempt to scrape, abuse, or overload the service</li>
            <li>Resell or redistribute raw output as a data product</li>
            <li>Use the service to harass, target, or harm individuals</li>
          </ul>
        </Section>

        <Section title="Your API Key">
          <p>If you supply a Claude API key, you are responsible for all usage and costs associated with that key. We are not liable for any charges incurred through use of PainMiner.</p>
        </Section>

        <Section title="Reddit Data">
          <p>PainMiner accesses publicly available Reddit data via Reddit's public API. We do not guarantee the accuracy, completeness, or availability of this data. Reddit may change or restrict their API at any time.</p>
        </Section>

        <Section title="No Warranties">
          <p>PainMiner is provided "as is" without warranty of any kind. We do not guarantee uptime, accuracy of AI analysis, or fitness for any particular purpose. Use at your own risk.</p>
        </Section>

        <Section title="Limitation of Liability">
          <p>To the maximum extent permitted by law, PainMiner and its operators shall not be liable for any indirect, incidental, or consequential damages arising from your use of the service.</p>
        </Section>

        <Section title="Changes">
          <p>We may update these terms at any time. Continued use of PainMiner constitutes acceptance of the updated terms.</p>
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

