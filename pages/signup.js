import { useState } from 'react';
import Link from 'next/link';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // TODO: wire to Supabase or email provider
    await new Promise(r => setTimeout(r, 600));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#0b1120] text-slate-100 flex flex-col">
      <nav className="border-b border-[#1e2a3a] px-6 py-4">
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="flex items-center gap-2.5 w-fit">
            <span className="text-lg">⛏️</span>
            <span className="font-semibold text-slate-100 tracking-tight">Subtext</span>
          </Link>
        </div>
      </nav>

      <div className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-sm">
          {submitted ? (
            <div className="text-center">
              <div className="text-5xl mb-4">⛏️</div>
              <h2 className="text-xl font-bold text-slate-100 mb-2">You're on the list</h2>
              <p className="text-slate-400 text-sm leading-relaxed">
                We'll email you when Subtext is ready. In the meantime, the tool is live — go find some pain.
              </p>
              <Link href="/" className="mt-6 inline-block bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition">
                Try the tool →
              </Link>
            </div>
          ) : (
            <>
              <div className="text-center mb-8">
                <span className="text-4xl">⛏️</span>
                <h1 className="text-2xl font-bold text-slate-100 mt-3 mb-2">Join the waitlist</h1>
                <p className="text-slate-400 text-sm">Be first in line when Subtext launches.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wider">Email address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    placeholder="you@example.com"
                    className="w-full bg-[#161c27] border border-[#1e2a3a] rounded-xl px-4 py-3 text-slate-100 placeholder-slate-600 text-sm focus:outline-none focus:border-blue-500/60 transition"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-[#1e2a3a] disabled:text-slate-600 text-white font-semibold py-3 rounded-xl transition text-sm flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                      </svg>
                      Joining...
                    </>
                  ) : 'Join waitlist'}
                </button>
              </form>

              <p className="text-center text-slate-600 text-xs mt-6">
                No spam. No credit card. Just early access.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

