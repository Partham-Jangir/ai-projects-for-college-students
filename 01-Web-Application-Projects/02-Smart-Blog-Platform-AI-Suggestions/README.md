# 📝 Smart Blog Platform with AI Content Suggestions

An intelligent blogging platform that uses AI to help content creators write better articles with automated suggestions for titles, outlines, SEO keywords, and content improvements.

## 🎯 Features

- **AI Title Generation**: Generate catchy blog titles based on topics
- **Content Outline**: Automatically structure your articles
- **Topic Suggestions**: Get trending topic ideas by category
- **Content Analysis**: Get readability scores and improvement tips
- **SEO Keywords**: Auto-generate relevant keywords
- **Writing Tips**: AI-powered writing recommendations

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **AI Engine**: Custom NLP algorithms
- **Optional**: OpenAI GPT integration for advanced suggestions

## 📦 Installation

```bash
npm install
npm run dev
```

## 🔗 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/posts` | Get all blog posts |
| POST | `/api/posts` | Create new blog post |
| GET | `/api/ai/titles?topic=X` | Get title suggestions |
| POST | `/api/ai/outline` | Generate content outline |
| GET | `/api/ai/topics?category=X` | Get topic suggestions |
| POST | `/api/ai/analyze` | Analyze content quality |
| POST | `/api/ai/keywords` | Generate SEO keywords |

## 🚀 Usage Example

```javascript
// Get title suggestions
fetch('/api/ai/titles?topic=Machine Learning')
  .then(res => res.json())
  .then(data => console.log(data.suggestions));

// Analyze content
fetch('/api/ai/analyze', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ content: 'Your blog content here...' })
})
  .then(res => res.json())
  .then(data => console.log(data.analysis));
```

## 📝 License

MIT License - Team Akrix

