import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { CATEGORIES } from '@/types';
import { getAllStories } from '@/lib/stories';

export default function CategoriesPage() {
  const stories = getAllStories();

  const categoryCounts = Object.keys(CATEGORIES).reduce((acc, key) => {
    acc[key] = stories.filter(s => s.category === key).length;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        <section className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b-2 border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Research Categories</h1>
            <p className="text-lg text-gray-700 max-w-3xl">
              Explore data stories organized by topic, from conflict analysis to environmental
              research, technology trends, and more.
            </p>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(CATEGORIES).map(([key, category]) => (
              <Link
                key={key}
                href={`/category/${key}`}
                className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{
                      backgroundColor: category.color + '20',
                      border: `2px solid ${category.color}`,
                    }}
                  >
                    <span className="text-xl font-bold" style={{ color: category.color }}>
                      {category.label.charAt(0)}
                    </span>
                  </div>
                  <div className="bg-gray-100 px-3 py-1 rounded-full">
                    <span className="text-sm font-semibold text-gray-700">
                      {categoryCounts[key] || 0} stories
                    </span>
                  </div>
                </div>

                <h2 className="text-xl font-bold text-gray-900 mb-2">{category.label}</h2>
                <p className="text-gray-600 text-sm leading-relaxed">{category.description}</p>

                <div className="mt-4 flex items-center font-medium" style={{ color: category.color }}>
                  Explore →
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
