import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StoryCard from '@/components/StoryCard';
import { getAllStories } from '@/lib/stories';
import { CATEGORIES } from '@/types';

export default function HomePage() {
  const stories = getAllStories();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        {/* Hero section */}
        <section className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b-2 border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <h1 className="text-5xl font-bold text-gray-900 mb-4">
                Data Stories for Society
              </h1>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                Evidence-based research exploring the critical issues shaping our world—from
                conflict and environment to technology, governance, and beyond.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <div className="bg-white px-6 py-3 rounded-lg border-2 border-gray-200">
                  <div className="text-3xl font-bold text-blue-600">{stories.length}</div>
                  <div className="text-sm text-gray-600">Research Stories</div>
                </div>
                <div className="bg-white px-6 py-3 rounded-lg border-2 border-gray-200">
                  <div className="text-3xl font-bold text-blue-600">
                    {Object.keys(CATEGORIES).length}
                  </div>
                  <div className="text-sm text-gray-600">Categories</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stories section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {stories.length === 0 ? (
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-6">
                <svg
                  className="w-10 h-10 text-gray-400"
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
              <h2 className="text-2xl font-bold text-gray-900 mb-2">No stories yet</h2>
              <p className="text-gray-600 mb-6">
                Be the first to contribute a data story to the research hub.
              </p>
              <a
                href="/create"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Create Your First Story
              </a>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-gray-900">Latest Research</h2>
                <p className="text-gray-600">{stories.length} stories published</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {stories.map(story => (
                  <StoryCard key={story.id} story={story} />
                ))}
              </div>
            </>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
