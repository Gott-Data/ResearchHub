# Research Hub

A scientific research platform for creating and sharing data-driven stories about the issues shaping our society.

## Overview

Research Hub is a modern web platform designed for researchers, journalists, and data scientists to publish evidence-based research stories following scientific paper standards. The platform supports rich data visualizations and structured content across multiple categories including conflict, environment, technology, society, governance, economy, and politics.

## Features

- **Scientific Structure**: Every story follows the standard scientific paper format:
  - Abstract
  - Introduction
  - Methodology
  - Results
  - Discussion
  - Conclusion
  - References

- **Category System**: Organize stories across 7 key categories:
  - Conflict & Wars
  - Environment
  - Technology
  - Society
  - Governance
  - Economy
  - Politics

- **Data Visualization Support**: Easily embed interactive visualizations from:
  - Datawrapper
  - Flourish
  - Any iframe-based visualization tool

- **Social Sharing**: Share stories across multiple platforms:
  - Twitter/X
  - Facebook
  - LinkedIn
  - Reddit
  - Email

- **Clean, Scientific Design**: Professional typography and layout optimized for reading and research

- **User Authentication**: Secure login system for content creators
  - User registration and login
  - Password hashing with bcrypt
  - Session management with NextAuth.js
  - Role-based access control (admin/author)

- **Content Management**: Full CRUD operations for authenticated users
  - Create new research stories
  - Edit your own stories
  - Delete your own stories
  - Admin users can manage all content

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: NextAuth.js with credentials provider
- **Data Storage**: JSON-based file system
- **Sharing**: react-share library

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Gott-Data/ResearchHub.git
cd ResearchHub
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env.local
```

Edit `.env.local` and set your `NEXTAUTH_SECRET`:
```bash
# Generate a secret with: openssl rand -base64 32
NEXTAUTH_SECRET=your-generated-secret-here
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
npm start
```

## Usage

### User Authentication

Before creating stories, you need to create an account:

1. Click "Sign Up" in the header
2. Enter your name, email, and password (minimum 8 characters)
3. Click "Create Account"
4. You'll be automatically logged in

To sign in later:
1. Click "Sign In" in the header
2. Enter your email and password
3. Click "Sign In"

### Creating a Data Story

**Note**: You must be logged in to create stories.

1. Navigate to the "Create Story" page (only visible when logged in)
2. Fill in the basic information:
   - Title
   - Category
   - Author
   - Keywords
   - DOI (optional)

3. Complete all scientific sections:
   - Abstract (concise summary)
   - Introduction (background and objectives)
   - Methodology (data sources and methods)
   - Results (key findings)
   - Discussion (interpretation and implications)
   - Conclusion (summary and future directions)

4. Add visualizations (optional):
   - Get embed URL from Datawrapper, Flourish, or similar tools
   - Specify which section to display in
   - Add captions and adjust height

5. Add references:
   - Include all cited sources
   - Provide URLs when available
   - Follow standard citation format

6. Publish your story

### Editing and Deleting Stories

When viewing your own stories, you'll see "Edit Story" and "Delete Story" buttons:

- **Edit**: Click to modify any section of your story
- **Delete**: Permanently remove your story (requires confirmation)

Admin users can edit and delete any story on the platform.

### Embedding Visualizations

To embed a visualization from Datawrapper:

1. Create your chart on [Datawrapper](https://www.datawrapper.de/)
2. Publish the chart
3. Copy the embed URL (usually ends with the chart ID)
4. In the Research Hub editor, add a new visualization
5. Paste the URL and configure settings

The same process works for Flourish and other tools that provide iframe embeds.

## Project Structure

```
ResearchHub/
├── app/                      # Next.js app directory
│   ├── api/                  # API routes
│   │   └── stories/          # Story management endpoints
│   ├── category/             # Category pages
│   ├── story/                # Individual story pages
│   ├── create/               # Story creation page
│   ├── categories/           # All categories page
│   ├── globals.css           # Global styles
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Homepage
├── components/               # React components
│   ├── Header.tsx            # Site header
│   ├── Footer.tsx            # Site footer
│   ├── StoryCard.tsx         # Story preview card
│   ├── ShareButtons.tsx      # Social sharing buttons
│   └── VisualizationEmbed.tsx # Viz embed component
├── lib/                      # Utility functions
│   ├── stories.ts            # Story data management
│   └── utils.ts              # Helper functions
├── types/                    # TypeScript type definitions
│   └── index.ts              # Main type definitions
├── data/                     # Data storage
│   └── stories/              # JSON story files
└── public/                   # Static assets
```

## Data Format

Stories are stored as JSON files in `data/stories/`. Example structure:

```json
{
  "id": "unique-id",
  "title": "Story Title",
  "slug": "story-slug",
  "category": "environment",
  "author": "Author Name",
  "date": "2024-11-17T00:00:00.000Z",
  "readTime": 10,
  "abstract": "...",
  "introduction": "...",
  "methodology": "...",
  "results": "...",
  "discussion": "...",
  "conclusion": "...",
  "keywords": ["keyword1", "keyword2"],
  "visualizations": [...],
  "references": [...]
}
```

## Contributing

Contributions are welcome! Please follow these guidelines:

1. Follow the scientific paper structure for all stories
2. Ensure all data sources are properly cited
3. Use reputable visualization tools
4. Maintain professional, objective tone
5. Test thoroughly before submitting

## License

See LICENSE file for details.

## Support

For questions or issues, please open a GitHub issue.

## Acknowledgments

Built with modern web technologies to support evidence-based research and data storytelling.
