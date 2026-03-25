import { useState } from 'react';
import Link from 'next/link';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Supabase auth goes here later
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#0b1120] text-slate-100 flex flex-col">
      <nav className="border-b border-[#1e2a3a] px-6 py-4">
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="flex items-center gap-2.5 w-fit">
            <span className="text-lg">⛏️</span>
            <span className="font-semibold text-slate-100 tracking-tight">PainMiner</span>
          </Link>
        </div>
      </nav>

      <div className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-sm">
          {submitted ? (
            <div className="text-center">
              <div className="text-4xl mb-4">✅</div>
              <h2 className="text-xl font-bold text-slate-100 mb-2">You're on the list</h2>
              <p className="text-slate-400 text-sm">We'll be in touch when PainMiner launches. In the meantime, try the tool.</p>
              <Link href="/" className="mt-6 inline-block text-sm text-blue-400 hover:text-blue-300 transition">
                ← Back to app
              </Link>
            </div>
          ) : (
            <>
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-slate-100 mb-2">Get started free</h1>
                <p className="text-slate-400 text-sm">Join the waitlist for full access.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wider">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    placeholder="you@example.com"
                    className="w-full bg-[#161c27] border border-[#1e2a3a] rounded-xl px-4 py-3 text-slate-100 placeholder-slate-600 text-sm focus:outline-none focus:border-blue-500/60 transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wider">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                    className="w-full bg-[#161c27] border border-[#1e2a3a] rounded-xl px-4 py-3 text-slate-100 placeholder-slate-600 text-sm focus:outline-none focus:border-blue-500/60 transition"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-xl transition text-sm mt-2"
                >
                  Create account
                </button>
              </form>

              <p className="text-center text-slate-500 text-xs mt-6">
                Already have an account?{' '}
                <Link href="/login" className="text-blue-400 hover:text-blue-300 transition">Sign in</Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
