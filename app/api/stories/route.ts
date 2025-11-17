import { NextRequest, NextResponse } from 'next/server';
import { saveStory, calculateReadTime } from '@/lib/stories';
import { DataStory } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const story: DataStory = await request.json();

    story.readTime = calculateReadTime(story);

    saveStory(story);

    return NextResponse.json({ success: true, story }, { status: 201 });
  } catch (error) {
    console.error('Error saving story:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to save story' },
      { status: 500 }
    );
  }
}
