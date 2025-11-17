import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ShareButtons from '@/components/ShareButtons';
import VisualizationEmbed from '@/components/VisualizationEmbed';
import { getStoryBySlug } from '@/lib/stories';
import { formatDate } from '@/lib/utils';
import { CATEGORIES } from '@/types';
import { FiClock, FiUser, FiCalendar } from 'react-icons/fi';

interface StoryPageProps {
  params: {
    slug: string;
  };
}

export default function StoryPage({ params }: StoryPageProps) {
  const story = getStoryBySlug(params.slug);

  if (!story) {
    notFound();
  }

  const category = CATEGORIES[story.category];
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const storyUrl = `${baseUrl}/story/${story.slug}`;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow bg-white">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <header className="mb-12 pb-8 border-b-2 border-gray-200">
            <div className="flex items-center space-x-3 mb-4">
              <span
                className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold border-2"
                style={{
                  borderColor: category.color,
                  color: category.color,
                }}
              >
                {category.label}
              </span>
              {story.doi && (
                <span className="text-sm text-gray-500">DOI: {story.doi}</span>
              )}
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {story.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-6">
              <div className="flex items-center">
                <FiUser className="mr-2" size={18} />
                <span className="font-medium">{story.author}</span>
              </div>
              <div className="flex items-center">
                <FiCalendar className="mr-2" size={18} />
                <time>{formatDate(story.date)}</time>
              </div>
              <div className="flex items-center">
                <FiClock className="mr-2" size={18} />
                <span>{story.readTime} min read</span>
              </div>
            </div>

            {story.keywords && story.keywords.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {story.keywords.map((keyword, index) => (
                  <span
                    key={index}
                    className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-full"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            )}

            <div className="pt-4">
              <ShareButtons
                url={storyUrl}
                title={story.title}
                description={story.abstract}
              />
            </div>
          </header>

          {/* Scientific paper sections */}
          <div className="scientific-content">
            {/* Abstract */}
            <section className="mb-12 p-6 bg-blue-50 border-l-4 border-blue-600 rounded-r-lg">
              <h2 className="text-2xl font-bold text-blue-900 mb-4">Abstract</h2>
              <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                {story.abstract}
              </p>
            </section>

            {/* Introduction */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-gray-200">
                1. Introduction
              </h2>
              <div className="prose max-w-none whitespace-pre-wrap">
                {story.introduction}
              </div>
              {story.visualizations
                ?.filter(v => v.section === 'introduction')
                .map(viz => (
                  <VisualizationEmbed key={viz.id} visualization={viz} />
                ))}
            </section>

            {/* Methodology */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-gray-200">
                2. Methodology
              </h2>
              <div className="prose max-w-none whitespace-pre-wrap">
                {story.methodology}
              </div>
              {story.visualizations
                ?.filter(v => v.section === 'methodology')
                .map(viz => (
                  <VisualizationEmbed key={viz.id} visualization={viz} />
                ))}
            </section>

            {/* Results */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-gray-200">
                3. Results
              </h2>
              <div className="prose max-w-none whitespace-pre-wrap">
                {story.results}
              </div>
              {story.visualizations
                ?.filter(v => v.section === 'results')
                .map(viz => (
                  <VisualizationEmbed key={viz.id} visualization={viz} />
                ))}
            </section>

            {/* Discussion */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-gray-200">
                4. Discussion
              </h2>
              <div className="prose max-w-none whitespace-pre-wrap">
                {story.discussion}
              </div>
              {story.visualizations
                ?.filter(v => v.section === 'discussion')
                .map(viz => (
                  <VisualizationEmbed key={viz.id} visualization={viz} />
                ))}
            </section>

            {/* Conclusion */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-gray-200">
                5. Conclusion
              </h2>
              <div className="prose max-w-none whitespace-pre-wrap">
                {story.conclusion}
              </div>
              {story.visualizations
                ?.filter(v => v.section === 'conclusion')
                .map(viz => (
                  <VisualizationEmbed key={viz.id} visualization={viz} />
                ))}
            </section>

            {/* References */}
            {story.references && story.references.length > 0 && (
              <section className="mb-12 p-6 bg-gray-50 rounded-lg border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">References</h2>
                <ol className="space-y-3 text-sm">
                  {story.references.map((ref, index) => (
                    <li key={ref.id} className="flex">
                      <span className="font-medium text-gray-700 mr-2">[{index + 1}]</span>
                      <div>
                        {ref.authors && ref.authors.length > 0 && (
                          <span className="text-gray-800">
                            {ref.authors.join(', ')}.{' '}
                          </span>
                        )}
                        {ref.year && (
                          <span className="text-gray-800">({ref.year}). </span>
                        )}
                        <span className="text-gray-800">{ref.text}</span>
                        {ref.publication && (
                          <span className="italic text-gray-700">
                            {' '}
                            {ref.publication}.
                          </span>
                        )}
                        {ref.url && (
                          <a
                            href={ref.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 ml-2"
                          >
                            [Link]
                          </a>
                        )}
                      </div>
                    </li>
                  ))}
                </ol>
              </section>
            )}
          </div>

          {/* Footer with share buttons */}
          <footer className="mt-12 pt-8 border-t-2 border-gray-200">
            <ShareButtons
              url={storyUrl}
              title={story.title}
              description={story.abstract}
            />
          </footer>
        </article>
      </main>

      <Footer />
    </div>
  );
}
