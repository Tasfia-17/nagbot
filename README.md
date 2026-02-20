# NagBot - Accountability Through Public Shame

A web-based accountability tool that uses the fear of public embarrassment to keep you on track with your goals.

## Features

- 🤖 Cute, animated mascot that reacts to your progress
- ⏰ Real-time countdown timers with visual urgency indicators
- 🐦 Automatic shame tweet posting for missed deadlines
- ✅ Multiple verification methods (manual, GitHub, Strava, webhook)
- 🎨 Beautiful glassmorphism UI with smooth animations
- 🎉 Celebration effects for completed goals

## Tech Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS + Framer Motion
- Supabase (PostgreSQL)
- Twitter API v2
- NextAuth.js

## Setup

1. Clone and install dependencies:
```bash
npm install
```

2. Set up Supabase:
   - Create a new project at supabase.com
   - Run the SQL in `supabase-schema.sql`
   - Copy your project URL and anon key

3. Set up Twitter Developer Account:
   - Create app at developer.twitter.com
   - Enable OAuth 2.0 with read+write permissions
   - Add callback URL: `https://yourdomain.com/api/auth/callback/twitter`

4. Configure environment variables in `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret
TWITTER_CLIENT_ID=your_twitter_client_id
TWITTER_CLIENT_SECRET=your_twitter_client_secret
CRON_SECRET=your_cron_secret
```

5. Run development server:
```bash
npm run dev
```

## Deployment

Deploy to Vercel:
```bash
vercel
```

The cron job will automatically run every 15 minutes to check deadlines.

## How It Works

1. **Create Goal**: Set a goal with a deadline and write an embarrassing tweet
2. **Choose Verification**: Select how you'll prove completion (manual check-in, GitHub commit, Strava activity, or webhook)
3. **Stay Accountable**: Watch the countdown timer and complete your goal
4. **Face Consequences**: If you miss the deadline, your shame tweet gets posted automatically

## Components

- `MascotCharacter` - Animated robot with mood states
- `CountdownTimer` - Circular progress timer with color shifts
- `GoalCard` - Glassmorphism card with goal details
- Dashboard - Overview of all active goals
- Create Goal - Multi-step goal creation wizard

## Security

- Twitter tokens encrypted at rest
- Rate limiting on shame tweets (max 1/hour per user)
- Cron endpoint protected with secret token
- Destructive actions require confirmation

## License

MIT
