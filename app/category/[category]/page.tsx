import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StoryCard from '@/components/StoryCard';
import { getStoriesByCategory } from '@/lib/stories';
import { CATEGORIES, Category } from '@/types';

interface CategoryPageProps {
  params: {
    category: string;
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const categoryKey = params.category as Category;

  if (!CATEGORIES[categoryKey]) {
    notFound();
  }

  const category = CATEGORIES[categoryKey];
  const stories = getStoriesByCategory(categoryKey);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        {/* Category header */}
        <section
          className="border-b-4 py-16"
          style={{ borderColor: category.color }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center mb-4">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mr-4"
                style={{ backgroundColor: category.color + '20', border: `3px solid ${category.color}` }}
              >
                <span className="text-2xl font-bold" style={{ color: category.color }}>
                  {category.label.charAt(0)}
                </span>
              </div>
              <div>
                <h1 className="text-4xl font-bold text-gray-900">{category.label}</h1>
                <p className="text-lg text-gray-600 mt-1">{category.description}</p>
              </div>
            </div>

            <div className="mt-6 flex items-center space-x-6">
              <div className="bg-white px-6 py-3 rounded-lg border-2 border-gray-200">
                <div className="text-2xl font-bold" style={{ color: category.color }}>
                  {stories.length}
                </div>
                <div className="text-sm text-gray-600">Research Stories</div>
              </div>
            </div>
          </div>
        </section>

        {/* Stories section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {stories.length === 0 ? (
            <div className="text-center py-20">
              <div
                className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6"
                style={{ backgroundColor: category.color + '20' }}
              >
                <svg
                  className="w-10 h-10"
                  style={{ color: category.color }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                No stories in this category yet
              </h2>
              <p className="text-gray-600 mb-6">
                Be the first to contribute a story about {category.label.toLowerCase()}.
              </p>
              <a
                href="/create"
                className="inline-block px-6 py-3 rounded-lg font-medium text-white transition-colors"
                style={{ backgroundColor: category.color }}
              >
                Create Story
              </a>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {stories.map(story => (
                <StoryCard key={story.id} story={story} />
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
