import { NextRequest, NextResponse } from 'next/server';

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const body = await req.json();

  // Log webhook ping for verification
  console.log(`Webhook received for goal ${id}:`, body);

  // Mark goal as verified (would update in database)
  return NextResponse.json({ success: true, goalId: id, timestamp: new Date() });
}
