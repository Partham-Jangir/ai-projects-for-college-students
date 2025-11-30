const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// Sample blog posts
let blogPosts = [
  {
    id: 1,
    title: "Getting Started with Machine Learning",
    content: "Machine learning is a subset of artificial intelligence...",
    category: "Technology",
    tags: ["AI", "ML", "Python"],
    author: "John Doe",
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    title: "The Future of Web Development",
    content: "Web development continues to evolve rapidly...",
    category: "Technology",
    tags: ["Web", "JavaScript", "React"],
    author: "Jane Smith",
    createdAt: new Date().toISOString()
  }
];

// AI Content Suggestion Engine
class AIContentSuggester {
  constructor() {
    this.topicDatabase = {
      Technology: ["AI trends", "Cloud computing", "Cybersecurity", "IoT", "5G networks"],
      Health: ["Mental wellness", "Nutrition tips", "Exercise routines", "Sleep hygiene"],
      Business: ["Startup tips", "Marketing strategies", "Leadership", "Remote work"],
      Education: ["Online learning", "Study techniques", "Career development"]
    };

    this.writingTips = [
      "Start with a compelling hook to grab reader attention",
      "Use subheadings to break up long content",
      "Include relevant statistics and data",
      "Add personal anecdotes for relatability",
      "End with a clear call-to-action"
    ];
  }

  // Generate title suggestions
  generateTitleSuggestions(topic, count = 5) {
    const templates = [
      `The Ultimate Guide to ${topic}`,
      `${count} Essential Tips for ${topic}`,
      `Why ${topic} Matters in 2024`,
      `How to Master ${topic}: A Complete Guide`,
      `${topic}: Everything You Need to Know`,
      `The Future of ${topic}: Trends and Predictions`,
      `Common Mistakes to Avoid in ${topic}`
    ];
    
    return templates.slice(0, count);
  }

  // Generate content outline
  generateOutline(title) {
    return {
      title,
      sections: [
        { heading: "Introduction", description: "Hook the reader and introduce the topic" },
        { heading: "Background", description: "Provide context and history" },
        { heading: "Key Points", description: "Main arguments or information" },
        { heading: "Practical Tips", description: "Actionable advice for readers" },
        { heading: "Case Studies", description: "Real-world examples" },
        { heading: "Conclusion", description: "Summarize and call-to-action" }
      ]
    };
  }

  // Get topic suggestions based on category
  getTopicSuggestions(category) {
    return this.topicDatabase[category] || this.topicDatabase["Technology"];
  }

  // Analyze content and suggest improvements
  analyzeContent(content) {
    const wordCount = content.split(/\s+/).length;
    const sentenceCount = content.split(/[.!?]+/).length;
    const avgWordsPerSentence = Math.round(wordCount / sentenceCount);

    const suggestions = [];

    if (wordCount < 300) {
      suggestions.push("Consider adding more content for better SEO (aim for 500+ words)");
    }
    if (avgWordsPerSentence > 25) {
      suggestions.push("Try shorter sentences for better readability");
    }
    if (!content.includes("?")) {
      suggestions.push("Add questions to engage readers");
    }

    return {
      wordCount,
      sentenceCount,
      avgWordsPerSentence,
      readabilityScore: this.calculateReadability(avgWordsPerSentence),
      suggestions
    };
  }

  calculateReadability(avgWords) {
    if (avgWords <= 15) return "Easy";
    if (avgWords <= 20) return "Medium";
    return "Hard";
  }

  // Generate SEO keywords
  generateKeywords(title, content) {
    const text = `${title} ${content}`.toLowerCase();
    const words = text.split(/\W+/);
    const stopWords = ["the", "a", "an", "is", "are", "was", "were", "be", "been", "to", "of", "and", "or", "in", "on"];
    
    const wordFreq = {};
    words.forEach(word => {
      if (word.length > 3 && !stopWords.includes(word)) {
        wordFreq[word] = (wordFreq[word] || 0) + 1;
      }
    });

    return Object.entries(wordFreq)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([word]) => word);
  }
}

const suggester = new AIContentSuggester();

// API Routes

// Get all blog posts
app.get('/api/posts', (req, res) => {
  res.json({ success: true, posts: blogPosts });
});

// Create new blog post
app.post('/api/posts', (req, res) => {
  const { title, content, category, tags, author } = req.body;
  const newPost = {
    id: blogPosts.length + 1,
    title,
    content,
    category,
    tags,
    author,
    createdAt: new Date().toISOString()
  };
  blogPosts.push(newPost);
  res.json({ success: true, post: newPost });
});

// Get AI title suggestions
app.get('/api/ai/titles', (req, res) => {
  const { topic } = req.query;
  if (!topic) {
    return res.status(400).json({ success: false, message: 'Topic is required' });
  }
  const suggestions = suggester.generateTitleSuggestions(topic);
  res.json({ success: true, suggestions });
});

// Get content outline
app.post('/api/ai/outline', (req, res) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ success: false, message: 'Title is required' });
  }
  const outline = suggester.generateOutline(title);
  res.json({ success: true, outline });
});

// Get topic suggestions
app.get('/api/ai/topics', (req, res) => {
  const { category } = req.query;
  const topics = suggester.getTopicSuggestions(category || "Technology");
  res.json({ success: true, topics });
});

// Analyze content
app.post('/api/ai/analyze', (req, res) => {
  const { content } = req.body;
  if (!content) {
    return res.status(400).json({ success: false, message: 'Content is required' });
  }
  const analysis = suggester.analyzeContent(content);
  res.json({ success: true, analysis });
});

// Generate SEO keywords
app.post('/api/ai/keywords', (req, res) => {
  const { title, content } = req.body;
  const keywords = suggester.generateKeywords(title || "", content || "");
  res.json({ success: true, keywords });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Smart Blog Platform AI Engine running!' });
});

app.listen(PORT, () => {
  console.log(`📝 Smart Blog Platform running on port ${PORT}`);
  console.log(`🤖 AI Content Suggester initialized`);
});

