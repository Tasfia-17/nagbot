import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

function getSupabase() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder-key';
  return createClient(supabaseUrl, supabaseKey);
}

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  const supabase = getSupabase();

  const { data: goal, error: fetchError } = await supabase
    .from('goals')
    .select('*, users(*)')
    .eq('id', id)
    .single();

  if (fetchError) {
    return NextResponse.json({ error: fetchError.message }, { status: 500 });
  }

  const now = new Date();
  const { error } = await supabase
    .from('goals')
    .update({ status: 'completed', completed_at: now.toISOString() })
    .eq('id', id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  await supabase.rpc('increment', { row_id: goal.user_id, column_name: 'completed_goals' });
  await supabase.rpc('increment', { row_id: goal.user_id, column_name: 'streak' });

  return NextResponse.json({ success: true });
}
