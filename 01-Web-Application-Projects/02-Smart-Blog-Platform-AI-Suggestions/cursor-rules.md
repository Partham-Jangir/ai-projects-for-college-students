# Cursor Rules Documentation
## Smart Blog Platform with AI Content Suggestions

This document explains the cursor rules and development guidelines for this AI-powered blogging platform.

## Project Overview
This project helps content creators write better articles through AI-powered suggestions for titles, outlines, SEO keywords, and content improvements.

## Tech Stack
- **Backend**: Node.js with Express.js
- **Database**: MongoDB with Mongoose
- **AI/ML**: Custom NLP algorithms, optional OpenAI
- **Package Manager**: npm

## Code Style Guidelines
- Use ES6+ JavaScript features
- Prefer async/await for asynchronous operations
- Use camelCase for variables and functions
- Keep functions focused and modular
- Add comments for complex text processing logic

## File Structure
```
/
├── server.js              # Main entry point
├── routes/                # API routes
│   ├── posts.js          # Blog post routes
│   └── ai.js             # AI feature routes
├── services/              # AI/NLP services
│   ├── titleGenerator.js
│   ├── contentAnalyzer.js
│   ├── keywordExtractor.js
│   └── outlineGenerator.js
├── models/                # Database models
│   └── Post.js
└── utils/                 # Helper functions
    └── textProcessing.js
```

## AI/ML Development Guidelines
- Implement NLP algorithms in separate service files
- Document algorithm logic clearly
- Handle edge cases: empty input, special characters
- Optimize text processing for performance
- Test with various content types and lengths

## API Development Standards
- Follow RESTful conventions
- Use consistent response formats
- Implement proper error handling
- Validate all text inputs
- Rate limit AI endpoints

## Text Processing Best Practices
- Normalize text input
- Handle encoding properly
- Implement efficient string operations
- Cache processed results when possible
- Consider performance for large texts

## Security Best Practices
- Validate and sanitize text inputs
- Implement rate limiting
- Protect API keys
- Content moderation
- Prevent injection attacks

## Performance Optimization
- Cache topic suggestions
- Optimize NLP algorithms
- Use async processing
- Implement pagination
- Monitor response times

---

**Last Updated:** 2024

