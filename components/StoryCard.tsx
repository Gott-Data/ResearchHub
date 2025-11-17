import Link from 'next/link';
import { DataStory, CATEGORIES } from '@/types';
import { formatDate, truncate } from '@/lib/utils';
import { FiClock, FiUser, FiTag } from 'react-icons/fi';

interface StoryCardProps {
  story: DataStory;
}

export default function StoryCard({ story }: StoryCardProps) {
  const category = CATEGORIES[story.category];

  return (
    <article className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <Link
          href={`/category/${story.category}`}
          className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border-2"
          style={{
            borderColor: category.color,
            color: category.color,
          }}
        >
          <FiTag className="mr-1" size={12} />
          {category.label}
        </Link>
        <div className="flex items-center text-sm text-gray-500">
          <FiClock className="mr-1" size={14} />
          {story.readTime} min read
        </div>
      </div>

      <Link href={`/story/${story.slug}`}>
        <h2 className="text-2xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors">
          {story.title}
        </h2>
      </Link>

      <p className="text-gray-700 mb-4 leading-relaxed">
        {truncate(story.abstract, 200)}
      </p>

      {story.keywords && story.keywords.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {story.keywords.slice(0, 5).map((keyword, index) => (
            <span
              key={index}
              className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
            >
              {keyword}
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center text-sm text-gray-600">
          <FiUser className="mr-2" size={14} />
          {story.author}
        </div>
        <time className="text-sm text-gray-500">{formatDate(story.date)}</time>
      </div>

      <Link
        href={`/story/${story.slug}`}
        className="mt-4 inline-block text-blue-600 font-medium hover:text-blue-800 transition-colors text-sm"
      >
        Read full analysis →
      </Link>
    </article>
  );
}
