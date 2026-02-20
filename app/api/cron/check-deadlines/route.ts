import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { refreshTwitterToken, postTweet, verifyGitHubCommit } from '@/lib/twitter';

function getSupabase() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder-key';
  return createClient(supabaseUrl, supabaseKey);
}

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = getSupabase();
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
      
      await supabase.rpc('increment', { row_id: goal.user_id, column_name: 'completed_goals' });
      await supabase.rpc('increment', { row_id: goal.user_id, column_name: 'streak' });
      
      results.push({ goalId: goal.id, status: 'completed' });
    } else {
      let accessToken = goal.users.twitter_access_token;
      
      // Try to refresh token if needed
      const refreshed = await refreshTwitterToken(goal.users.twitter_refresh_token);
      if (refreshed) {
        accessToken = refreshed;
        await supabase
          .from('users')
          .update({ twitter_access_token: refreshed })
          .eq('id', goal.user_id);
      }
      
      const tweeted = await postTweet(accessToken, goal.shame_tweet_text);
      
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
    return false;
  }
  
  if (goal.verification_method === 'github' && goal.verification_data?.githubRepo && goal.users?.twitter_handle) {
    const since = new Date(goal.created_at);
    const until = new Date(goal.deadline);
    return await verifyGitHubCommit(
      goal.verification_data.githubRepo,
      goal.users.twitter_handle,
      since,
      until
    );
  }
  
  return false;
}
