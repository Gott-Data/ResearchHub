import { DataStory, Category } from '@/types';
import fs from 'fs';
import path from 'path';

const storiesDirectory = path.join(process.cwd(), 'data', 'stories');

// Ensure directory exists
export function ensureStoriesDirectory() {
  if (!fs.existsSync(storiesDirectory)) {
    fs.mkdirSync(storiesDirectory, { recursive: true });
  }
}

// Get all stories
export function getAllStories(): DataStory[] {
  ensureStoriesDirectory();

  const files = fs.readdirSync(storiesDirectory);
  const stories = files
    .filter(file => file.endsWith('.json'))
    .map(file => {
      const filePath = path.join(storiesDirectory, file);
      const content = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(content) as DataStory;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return stories;
}

// Get stories by category
export function getStoriesByCategory(category: Category): DataStory[] {
  const allStories = getAllStories();
  return allStories.filter(story => story.category === category);
}

// Get single story by slug
export function getStoryBySlug(slug: string): DataStory | null {
  ensureStoriesDirectory();

  const files = fs.readdirSync(storiesDirectory);

  for (const file of files) {
    if (!file.endsWith('.json')) continue;

    const filePath = path.join(storiesDirectory, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const story = JSON.parse(content) as DataStory;

    if (story.slug === slug) {
      return story;
    }
  }

  return null;
}

// Save a story
export function saveStory(story: DataStory): void {
  ensureStoriesDirectory();

  const fileName = `${story.id}.json`;
  const filePath = path.join(storiesDirectory, fileName);

  fs.writeFileSync(filePath, JSON.stringify(story, null, 2), 'utf8');
}

// Get single story by ID
export function getStoryById(id: string): DataStory | null {
  ensureStoriesDirectory();

  const filePath = path.join(storiesDirectory, `${id}.json`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const content = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(content) as DataStory;
}

// Update a story
export function updateStory(story: DataStory): void {
  ensureStoriesDirectory();

  const fileName = `${story.id}.json`;
  const filePath = path.join(storiesDirectory, fileName);

  // Check if story exists
  if (!fs.existsSync(filePath)) {
    throw new Error('Story not found');
  }

  // Update lastModified timestamp
  story.lastModified = new Date().toISOString();

  fs.writeFileSync(filePath, JSON.stringify(story, null, 2), 'utf8');
}

// Delete a story
export function deleteStory(id: string): boolean {
  ensureStoriesDirectory();

  const fileName = `${id}.json`;
  const filePath = path.join(storiesDirectory, fileName);

  if (!fs.existsSync(filePath)) {
    return false;
  }

  fs.unlinkSync(filePath);
  return true;
}

// Calculate read time based on content
export function calculateReadTime(story: DataStory): number {
  const wordsPerMinute = 200;
  const text = [
    story.abstract,
    story.introduction,
    story.methodology,
    story.results,
    story.discussion,
    story.conclusion,
  ].join(' ');

  const words = text.split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}
