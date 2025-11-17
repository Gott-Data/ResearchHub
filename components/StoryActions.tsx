'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';

interface StoryActionsProps {
  storyId: string;
  storySlug: string;
  authorId: string;
}

export default function StoryActions({ storyId, storySlug, authorId }: StoryActionsProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  if (!session || !session.user) {
    return null;
  }

  const userId = (session.user as any).id;
  const userRole = (session.user as any).role;

  // Only show actions if user owns the story or is admin
  if (authorId !== userId && userRole !== 'admin') {
    return null;
  }

  const handleEdit = () => {
    router.push(`/edit/${storyId}`);
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this story? This action cannot be undone.')) {
      return;
    }

    setDeleting(true);

    try {
      const response = await fetch(`/api/stories/${storyId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        router.push('/');
      } else {
        const data = await response.json();
        alert(data.error || 'Failed to delete story');
      }
    } catch (error) {
      console.error('Error deleting story:', error);
      alert('Failed to delete story');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="flex items-center space-x-3 pt-4">
      <button
        onClick={handleEdit}
        className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        <FiEdit size={18} />
        <span>Edit Story</span>
      </button>
      <button
        onClick={handleDelete}
        disabled={deleting}
        className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <FiTrash2 size={18} />
        <span>{deleting ? 'Deleting...' : 'Delete Story'}</span>
      </button>
    </div>
  );
}
