# ⛏️ Reddit Pain Miner

Find real problems. Build real products.

Enter any subreddit → get an AI-powered breakdown of the top pain points, recurring complaints, unmet needs, and product opportunities — all from real posts by real people.

## How it works

1. Enter a subreddit (e.g. `solopreneur`, `startups`, `freelance`)
2. Enter your [Claude API key](https://console.anthropic.com/) (free tier works)
3. Hit **Mine for Pain Points**
4. Get structured insights: pain points, themes, opportunities, and quotes ready for landing pages

Your API key is never stored — it stays in your browser session only.

## Running locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Push this repo to GitHub
2. Import to Vercel
3. Deploy — no environment variables needed (users bring their own API key)

## Stack

- Next.js 14
- Tailwind CSS
- Claude API (claude-3-5-haiku for speed + cost)
- Reddit public JSON API (no auth required)
