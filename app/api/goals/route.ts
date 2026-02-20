import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  const { userId, title, deadline, verificationMethod, verificationData, shameTweetText } = await req.json();

  const { data, error } = await supabase
    .from('goals')
    .insert({
      user_id: userId,
      title,
      deadline,
      verification_method: verificationMethod,
      verification_data: verificationData,
      shame_tweet_text: shameTweetText,
      status: 'active',
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  await supabase.rpc('increment', { row_id: userId, column_name: 'total_goals' });

  return NextResponse.json(data);
}

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get('userId');
  const status = req.nextUrl.searchParams.get('status') || 'active';

  const { data, error } = await supabase
    .from('goals')
    .select('*')
    .eq('user_id', userId)
    .eq('status', status)
    .order('deadline', { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
