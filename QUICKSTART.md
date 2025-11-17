# Quick Start Guide

Get your Research Hub up and running in 5 minutes!

## Installation

```bash
# 1. Clone the repository
git clone https://github.com/Gott-Data/ResearchHub.git
cd ResearchHub

# 2. Install dependencies
npm install

# 3. Run development server
npm run dev
```

Visit http://localhost:3000 to see your Research Hub!

## Creating Your First Story

1. **Click "Create Story"** in the navigation bar

2. **Fill in basic info**:
   - Title: "Your Research Title"
   - Category: Choose from 7 categories
   - Author: Your name
   - Keywords: Add relevant keywords (comma-separated)

3. **Write your abstract** (150-250 words):
   - Summarize your research question
   - State key findings
   - Mention implications

4. **Complete the scientific sections**:
   - **Introduction**: What's the problem? Why does it matter?
   - **Methodology**: What data did you use? How did you analyze it?
   - **Results**: What did you find?
   - **Discussion**: What does it mean? What are the limitations?
   - **Conclusion**: What's the takeaway? What's next?

5. **Add visualizations** (optional):
   - Create a chart on Datawrapper or Flourish
   - Copy the embed URL
   - Click "Add Visualization"
   - Paste URL and configure

6. **Add references**:
   - Click "Add Reference"
   - Enter citation details
   - Include URLs when available

7. **Click "Publish Story"**!

## Embedding Visualizations

### From Datawrapper:
1. Go to [datawrapper.de](https://www.datawrapper.de/)
2. Upload your data and create visualization
3. Click "Publish & Embed"
4. Copy the URL from the embed code
5. Use in Research Hub

### From Flourish:
1. Go to [flourish.studio](https://flourish.studio/)
2. Create your visualization
3. Click "Export & publish"
4. Copy the visualization URL
5. Use in Research Hub

## Project Structure

```
ResearchHub/
├── app/              # Pages and routes
├── components/       # UI components
├── lib/              # Helper functions
├── types/            # TypeScript types
├── data/
│   └── stories/      # Your stories (JSON files)
└── public/           # Static files
```

## Tips for Great Stories

1. **Use credible data sources**: Government agencies, international organizations, peer-reviewed research

2. **Create clear visualizations**: Label axes, add legends, use accessible colors

3. **Write for your audience**: Explain technical terms, avoid jargon

4. **Cite everything**: Give credit to original sources

5. **Review before publishing**: Check for typos, verify data, test visualizations

## Common Issues

**Visualization not showing?**
- Verify the URL is correct
- Check the height setting (try 400-600px)
- Ensure the visualization tool allows embedding

**Story not saving?**
- Check that all required fields are filled
- Verify the data/stories directory exists
- Check browser console for errors

**Build errors?**
- Run `npm install` again
- Delete node_modules and reinstall
- Check Node.js version (18+)

## Next Steps

- Explore the sample story to see the format
- Browse categories to understand the structure
- Check CONTRIBUTING.md for detailed guidelines
- Share your published stories on social media

## Need Help?

- Read the full README.md
- Check CONTRIBUTING.md for guidelines
- Open an issue on GitHub
- Review existing stories for examples

Happy researching! 📊
