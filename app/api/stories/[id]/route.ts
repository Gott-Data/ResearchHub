import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getStoryById, updateStory, deleteStory, calculateReadTime } from '@/lib/stories';
import { DataStory } from '@/types';

// GET a single story by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const story = getStoryById(params.id);

    if (!story) {
      return NextResponse.json({ error: 'Story not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, story }, { status: 200 });
  } catch (error) {
    console.error('Error fetching story:', error);
    return NextResponse.json(
      { error: 'Failed to fetch story' },
      { status: 500 }
    );
  }
}

// PUT (update) a story
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const existingStory = getStoryById(params.id);

    if (!existingStory) {
      return NextResponse.json({ error: 'Story not found' }, { status: 404 });
    }

    // Check if user owns the story or is admin
    const userRole = (session.user as any).role;
    const userId = (session.user as any).id;

    if (existingStory.authorId !== userId && userRole !== 'admin') {
      return NextResponse.json(
        { error: 'You do not have permission to edit this story' },
        { status: 403 }
      );
    }

    const updatedData: DataStory = await request.json();
    updatedData.id = params.id; // Ensure ID doesn't change
    updatedData.readTime = calculateReadTime(updatedData);

    updateStory(updatedData);

    return NextResponse.json({ success: true, story: updatedData }, { status: 200 });
  } catch (error: any) {
    console.error('Error updating story:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to update story' },
      { status: 500 }
    );
  }
}

// DELETE a story
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const existingStory = getStoryById(params.id);

    if (!existingStory) {
      return NextResponse.json({ error: 'Story not found' }, { status: 404 });
    }

    // Check if user owns the story or is admin
    const userRole = (session.user as any).role;
    const userId = (session.user as any).id;

    if (existingStory.authorId !== userId && userRole !== 'admin') {
      return NextResponse.json(
        { error: 'You do not have permission to delete this story' },
        { status: 403 }
      );
    }

    const deleted = deleteStory(params.id);

    if (!deleted) {
      return NextResponse.json({ error: 'Failed to delete story' }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Error deleting story:', error);
    return NextResponse.json(
      { error: 'Failed to delete story' },
      { status: 500 }
    );
  }
}
