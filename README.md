# NagBot - Accountability Through Public Shame

A web-based accountability tool that uses the fear of public embarrassment to keep you on track with your goals.

![NagBot](https://img.shields.io/badge/Next.js-14-black) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![License](https://img.shields.io/badge/license-MIT-green)

## 🤖 Features

- **Animated Mascot** - Cute robot character that reacts to your progress with 5 mood states
- **Real-time Countdowns** - Visual urgency indicators with color-coded progress rings
- **Automatic Shame Tweets** - Miss a deadline? Your embarrassing tweet goes public automatically
- **Multiple Verification Methods**:
  - ✅ Manual check-in
  - 🔧 GitHub commit verification
  - 🏃 Strava activity tracking
  - 🔗 Custom webhook integration
- **Beautiful UI** - Glassmorphism design with smooth Framer Motion animations
- **Celebration Effects** - Confetti animations when you complete goals

## 🚀 Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Database**: Supabase (PostgreSQL)
- **Authentication**: NextAuth.js with Twitter OAuth 2.0
- **APIs**: Twitter API v2, GitHub API
- **Deployment**: Vercel with Cron Jobs

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/Tasfia-17/nagbot.git
cd nagbot
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables (copy `.env.example` to `.env.local`):
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

4. Set up Supabase:
   - Create a new project at [supabase.com](https://supabase.com)
   - Run the SQL in `supabase-schema.sql` in the SQL editor
   - Copy your project URL and keys to `.env.local`

5. Set up Twitter Developer Account:
   - Create an app at [developer.twitter.com](https://developer.twitter.com)
   - Enable OAuth 2.0 with read+write permissions
   - Add callback URL: `http://localhost:3000/api/auth/callback/twitter`
   - Copy your client ID and secret to `.env.local`

6. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## 🎯 How It Works

1. **Create a Goal** - Set a deadline and write an embarrassing tweet
2. **Choose Verification** - Select how you'll prove completion
3. **Stay Accountable** - Watch the countdown timer tick down
4. **Complete or Face Shame** - Mark it done or your tweet goes public

## 📁 Project Structure

```
nagbot/
├── app/
│   ├── api/              # API routes
│   │   ├── auth/         # NextAuth handlers
│   │   ├── cron/         # Deadline checking cron job
│   │   ├── goals/        # Goal CRUD operations
│   │   └── webhooks/     # Webhook verification
│   ├── create/           # Goal creation page
│   ├── dashboard/        # Main dashboard
│   ├── onboarding/       # User onboarding flow
│   └── layout.tsx        # Root layout
├── components/
│   ├── MascotCharacter.tsx    # Animated robot mascot
│   ├── CountdownTimer.tsx     # Circular progress timer
│   ├── GoalCard.tsx           # Goal display card
│   ├── Confetti.tsx           # Celebration animation
│   └── ShameTweetPreview.tsx  # Tweet preview
├── lib/
│   ├── supabase.ts       # Supabase client
│   └── twitter.ts        # Twitter/GitHub API helpers
├── types/
│   └── index.ts          # TypeScript definitions
└── supabase-schema.sql   # Database schema

```

## 🎨 Design System

- **Colors**: Violet primary, Emerald success, Rose danger
- **Typography**: Inter font family
- **Shapes**: Rounded corners (16-24px)
- **Effects**: Glassmorphism, soft shadows, smooth animations

## 🔒 Security

- Twitter tokens encrypted at rest
- Rate limiting on shame tweets (max 1/hour per user)
- Cron endpoint protected with secret token
- Destructive actions require confirmation

## 📝 License

MIT License - feel free to use this project for your own accountability needs!

## 🤝 Contributing

Contributions welcome! Feel free to open issues or submit pull requests.

## ⚠️ Disclaimer

This app will actually post tweets to your Twitter account if you miss deadlines. Use responsibly and choose your shame tweets wisely!

---

Built with 💜 by the NagBot team
