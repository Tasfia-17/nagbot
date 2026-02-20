import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const now = new Date();
  const { data: goals, error } = await supabase
    .from('goals')
    .select('*, users(*)')
    .eq('status', 'active')
    .lt('deadline', now.toISOString());

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const results = [];

  for (const goal of goals || []) {
    const verified = await verifyGoal(goal);

    if (verified) {
      await supabase
        .from('goals')
        .update({ status: 'completed', completed_at: now.toISOString() })
        .eq('id', goal.id);
      results.push({ goalId: goal.id, status: 'completed' });
    } else {
      const tweeted = await postShameTweet(goal);
      await supabase
        .from('goals')
        .update({ status: 'failed', tweeted_at: now.toISOString() })
        .eq('id', goal.id);
      results.push({ goalId: goal.id, status: 'failed', tweeted });
    }
  }

  return NextResponse.json({ checked: goals?.length || 0, results });
}

async function verifyGoal(goal: any): Promise<boolean> {
  if (goal.verification_method === 'manual') {
    return false; // Manual requires user action
  }
  // Add GitHub, Strava, webhook verification logic here
  return false;
}

async function postShameTweet(goal: any): Promise<boolean> {
  try {
    const response = await fetch('https://api.twitter.com/2/tweets', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${goal.users.twitter_access_token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: goal.shame_tweet_text }),
    });
    return response.ok;
  } catch (error) {
    console.error('Failed to post tweet:', error);
    return false;
  }
}
