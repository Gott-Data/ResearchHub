'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { CATEGORIES, Category, DataStory, Visualization, Reference } from '@/types';
import { generateId, generateSlug } from '@/lib/utils';
import { FiPlus, FiTrash2, FiSave } from 'react-icons/fi';

export default function EditStoryPage() {
  const router = useRouter();
  const params = useParams();
  const storyId = params.id as string;
  const { data: session, status } = useSession();
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [story, setStory] = useState<DataStory | null>(null);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  // Load existing story
  useEffect(() => {
    if (status === 'authenticated' && storyId) {
      loadStory();
    }
  }, [status, storyId]);

  const loadStory = async () => {
    try {
      const response = await fetch(`/api/stories/${storyId}`);
      if (!response.ok) {
        alert('Story not found');
        router.push('/');
        return;
      }
      const data = await response.json();
      const loadedStory = data.story as DataStory;

      // Check if user owns the story
      const userId = (session?.user as any)?.id;
      const userRole = (session?.user as any)?.role;

      if (loadedStory.authorId !== userId && userRole !== 'admin') {
        alert('You do not have permission to edit this story');
        router.push(`/story/${loadedStory.slug}`);
        return;
      }

      setStory(loadedStory);
      setFormData({
        title: loadedStory.title,
        category: loadedStory.category,
        author: loadedStory.author,
        abstract: loadedStory.abstract,
        introduction: loadedStory.introduction,
        methodology: loadedStory.methodology,
        results: loadedStory.results,
        discussion: loadedStory.discussion,
        conclusion: loadedStory.conclusion,
        keywords: loadedStory.keywords.join(', '),
        doi: loadedStory.doi || '',
      });
      setVisualizations(loadedStory.visualizations || []);
      setReferences(loadedStory.references || []);
      setLoading(false);
    } catch (error) {
      console.error('Error loading story:', error);
      alert('Failed to load story');
      router.push('/');
    }
  };

  // Show loading state while checking auth or loading story
  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-solid border-blue-600 border-r-transparent mb-4"></div>
            <p className="text-gray-600">{loading ? 'Loading story...' : 'Loading...'}</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Don't render form if not authenticated or no story
  if (!session || !story) {
    return null;
  }

  const [formData, setFormData] = useState({
    title: '',
    category: 'technology' as Category,
    author: '',
    abstract: '',
    introduction: '',
    methodology: '',
    results: '',
    discussion: '',
    conclusion: '',
    keywords: '',
    doi: '',
  });

  const [visualizations, setVisualizations] = useState<Visualization[]>([]);
  const [references, setReferences] = useState<Reference[]>([]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const addVisualization = () => {
    setVisualizations([
      ...visualizations,
      {
        id: generateId(),
        type: 'iframe',
        url: '',
        caption: '',
        height: 500,
        section: 'results',
      },
    ]);
  };

  const removeVisualization = (id: string) => {
    setVisualizations(visualizations.filter(v => v.id !== id));
  };

  const updateVisualization = (id: string, field: string, value: any) => {
    setVisualizations(
      visualizations.map(v => (v.id === id ? { ...v, [field]: value } : v))
    );
  };

  const addReference = () => {
    setReferences([
      ...references,
      {
        id: generateId(),
        text: '',
        url: '',
        authors: [],
        year: new Date().getFullYear(),
        publication: '',
      },
    ]);
  };

  const removeReference = (id: string) => {
    setReferences(references.filter(r => r.id !== id));
  };

  const updateReference = (id: string, field: string, value: any) => {
    setReferences(references.map(r => (r.id === id ? { ...r, [field]: value } : r)));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const updatedStory: DataStory = {
        ...story,
        title: formData.title,
        slug: generateSlug(formData.title),
        category: formData.category,
        author: formData.author,
        abstract: formData.abstract,
        introduction: formData.introduction,
        methodology: formData.methodology,
        results: formData.results,
        discussion: formData.discussion,
        conclusion: formData.conclusion,
        keywords: formData.keywords.split(',').map(k => k.trim()).filter(Boolean),
        doi: formData.doi || undefined,
        visualizations: visualizations.length > 0 ? visualizations : undefined,
        references,
      };

      const response = await fetch(`/api/stories/${storyId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedStory),
      });

      if (response.ok) {
        router.push(`/story/${updatedStory.slug}`);
      } else {
        const data = await response.json();
        alert(data.error || 'Failed to update story. Please try again.');
      }
    } catch (error) {
      console.error('Error updating story:', error);
      alert('Failed to update story. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-grow">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white border-2 border-gray-200 rounded-lg p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Edit Research Story</h1>
            <p className="text-gray-600 mb-8">
              Update your research story following the scientific paper structure.
            </p>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Basic Information */}
              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-gray-200">
                  Basic Information
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Title *
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                      placeholder="Enter a descriptive title for your research"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Category *
                      </label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                      >
                        {Object.entries(CATEGORIES).map(([key, cat]) => (
                          <option key={key} value={key}>
                            {cat.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Author *
                      </label>
                      <input
                        type="text"
                        name="author"
                        value={formData.author}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                        placeholder="Your name"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Keywords (comma-separated)
                    </label>
                    <input
                      type="text"
                      name="keywords"
                      value={formData.keywords}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                      placeholder="e.g., climate change, data analysis, policy"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      DOI (optional)
                    </label>
                    <input
                      type="text"
                      name="doi"
                      value={formData.doi}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                      placeholder="10.xxxx/xxxxx"
                    />
                  </div>
                </div>
              </section>

              {/* Abstract */}
              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-gray-200">
                  Abstract *
                </h2>
                <textarea
                  name="abstract"
                  value={formData.abstract}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                  placeholder="Provide a concise summary of your research (150-250 words)"
                />
              </section>

              {/* Introduction */}
              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-gray-200">
                  1. Introduction *
                </h2>
                <textarea
                  name="introduction"
                  value={formData.introduction}
                  onChange={handleInputChange}
                  required
                  rows={10}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                  placeholder="Background, context, and research objectives..."
                />
              </section>

              {/* Methodology */}
              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-gray-200">
                  2. Methodology *
                </h2>
                <textarea
                  name="methodology"
                  value={formData.methodology}
                  onChange={handleInputChange}
                  required
                  rows={10}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                  placeholder="Data sources, analysis methods, and research approach..."
                />
              </section>

              {/* Results */}
              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-gray-200">
                  3. Results *
                </h2>
                <textarea
                  name="results"
                  value={formData.results}
                  onChange={handleInputChange}
                  required
                  rows={10}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                  placeholder="Key findings and data analysis outcomes..."
                />
              </section>

              {/* Discussion */}
              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-gray-200">
                  4. Discussion *
                </h2>
                <textarea
                  name="discussion"
                  value={formData.discussion}
                  onChange={handleInputChange}
                  required
                  rows={10}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                  placeholder="Interpretation of results, implications, and limitations..."
                />
              </section>

              {/* Conclusion */}
              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-gray-200">
                  5. Conclusion *
                </h2>
                <textarea
                  name="conclusion"
                  value={formData.conclusion}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                  placeholder="Summary and future research directions..."
                />
              </section>

              {/* Visualizations */}
              <section>
                <div className="flex items-center justify-between mb-4 pb-2 border-b-2 border-gray-200">
                  <h2 className="text-xl font-bold text-gray-900">Data Visualizations</h2>
                  <button
                    type="button"
                    onClick={addVisualization}
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <FiPlus className="mr-2" />
                    Add Visualization
                  </button>
                </div>

                {visualizations.length === 0 ? (
                  <p className="text-gray-500 italic">
                    No visualizations added yet. Click "Add Visualization" to embed charts from
                    Datawrapper or other tools.
                  </p>
                ) : (
                  <div className="space-y-4">
                    {visualizations.map((viz, index) => (
                      <div key={viz.id} className="p-4 border-2 border-gray-200 rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-medium text-gray-900">
                            Visualization {index + 1}
                          </h3>
                          <button
                            type="button"
                            onClick={() => removeVisualization(viz.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <FiTrash2 />
                          </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Embed URL *
                            </label>
                            <input
                              type="url"
                              value={viz.url}
                              onChange={e =>
                                updateVisualization(viz.id, 'url', e.target.value)
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                              placeholder="https://datawrapper.dwcdn.net/..."
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Section
                            </label>
                            <select
                              value={viz.section}
                              onChange={e =>
                                updateVisualization(viz.id, 'section', e.target.value)
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                            >
                              <option value="introduction">Introduction</option>
                              <option value="methodology">Methodology</option>
                              <option value="results">Results</option>
                              <option value="discussion">Discussion</option>
                              <option value="conclusion">Conclusion</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Caption
                            </label>
                            <input
                              type="text"
                              value={viz.caption}
                              onChange={e =>
                                updateVisualization(viz.id, 'caption', e.target.value)
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                              placeholder="Figure description"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Height (px)
                            </label>
                            <input
                              type="number"
                              value={viz.height}
                              onChange={e =>
                                updateVisualization(
                                  viz.id,
                                  'height',
                                  parseInt(e.target.value)
                                )
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                              placeholder="500"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </section>

              {/* References */}
              <section>
                <div className="flex items-center justify-between mb-4 pb-2 border-b-2 border-gray-200">
                  <h2 className="text-xl font-bold text-gray-900">References</h2>
                  <button
                    type="button"
                    onClick={addReference}
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <FiPlus className="mr-2" />
                    Add Reference
                  </button>
                </div>

                {references.length === 0 ? (
                  <p className="text-gray-500 italic">
                    No references added yet. Click "Add Reference" to cite your sources.
                  </p>
                ) : (
                  <div className="space-y-4">
                    {references.map((ref, index) => (
                      <div key={ref.id} className="p-4 border-2 border-gray-200 rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-medium text-gray-900">Reference {index + 1}</h3>
                          <button
                            type="button"
                            onClick={() => removeReference(ref.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <FiTrash2 />
                          </button>
                        </div>

                        <div className="space-y-3">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Citation Text *
                            </label>
                            <input
                              type="text"
                              value={ref.text}
                              onChange={e => updateReference(ref.id, 'text', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                              placeholder="Full citation text"
                            />
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                URL
                              </label>
                              <input
                                type="url"
                                value={ref.url}
                                onChange={e => updateReference(ref.id, 'url', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                                placeholder="https://..."
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Publication
                              </label>
                              <input
                                type="text"
                                value={ref.publication}
                                onChange={e =>
                                  updateReference(ref.id, 'publication', e.target.value)
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                                placeholder="Journal or publication name"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </section>

              {/* Submit button */}
              <div className="flex items-center justify-end space-x-4 pt-6 border-t-2 border-gray-200">
                <button
                  type="button"
                  onClick={() => router.push('/')}
                  className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FiSave className="mr-2" />
                  {saving ? 'Updating...' : 'Update Story'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
