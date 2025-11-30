# Cursor Rules Documentation
## AI Podcast Transcription Summarization

This document explains the cursor rules and development guidelines for this project.

## Project Overview
This project is an AI-powered podcast application that uses machine learning and artificial intelligence to provide intelligent features.

## Tech Stack
- **Backend Framework**: Node.js with Express.js
- **Database**: MongoDB with Mongoose ODM
- **AI/ML**: Custom algorithms, optional OpenAI
- **Package Manager**: npm

## Code Style Guidelines

### JavaScript Conventions
- Use ES6+ features (arrow functions, destructuring, template literals)
- Prefer `const` over `let`, avoid `var`
- Use async/await for asynchronous operations
- Use camelCase for variables and functions
- Use PascalCase for classes and constructors

### Code Organization
- Keep functions small and focused
- Separate concerns: routes, controllers, services, models
- Use meaningful variable and function names
- Add JSDoc comments for complex functions

## File Structure
```
/
├── server.js              # Main application entry point
├── routes/                # API route definitions
├── controllers/           # Business logic handlers
├── services/              # AI/ML algorithms
├── models/                # MongoDB schemas
├── middleware/            # Express middleware
└── utils/                 # Helper functions
```

## AI/ML Development Guidelines

### Algorithm Implementation
- Implement algorithms in separate service files
- Document algorithm logic clearly
- Handle edge cases
- Optimize for performance
- Test with sample datasets

## API Development Standards

### RESTful Conventions
- Use proper HTTP methods (GET, POST, PUT, DELETE)
- Use consistent URL patterns
- Return consistent response formats
- Use appropriate HTTP status codes

### Response Format
```javascript
{
  success: true/false,
  data: {...},
  message: "Success message",
  error: "Error message if any"
}
```

### Error Handling
- Use try-catch blocks for async operations
- Return meaningful error messages
- Log errors for debugging
- Use appropriate HTTP status codes

## Database Guidelines

### MongoDB Best Practices
- Use Mongoose schemas with validation
- Create indexes for frequently queried fields
- Use aggregation pipelines for complex queries
- Handle connection errors gracefully

## Security Best Practices

### Input Validation
- Validate all user inputs
- Sanitize data before database operations
- Implement rate limiting
- Use parameterized queries

### Authentication & Authorization
- Use JWT tokens for authentication
- Implement token expiration
- Protect sensitive endpoints

### Data Protection
- Use environment variables for secrets
- Implement CORS properly
- Use HTTPS in production

## Performance Optimization

### Caching Strategy
- Cache frequently accessed data
- Implement cache invalidation
- Use efficient data structures

### Database Optimization
- Create indexes on frequently queried fields
- Use aggregation pipelines efficiently
- Implement pagination for large datasets

## Testing Approach

### Unit Testing
- Test AI algorithms with sample data
- Test utility functions
- Test error handling

### Integration Testing
- Test API endpoints
- Test database operations
- Test authentication flows

## Error Handling Patterns

### Try-Catch Blocks
```javascript
try {
  const result = await someAsyncOperation();
  return { success: true, data: result };
} catch (error) {
  logger.error('Operation failed:', error);
  return { success: false, error: error.message };
}
```

## Common Development Patterns

### Express Route Pattern
```javascript
router.get('/endpoint', 
  authMiddleware,
  validationMiddleware,
  async (req, res) => {
    try {
      const result = await serviceFunction();
      res.json({ success: true, data: result });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
);
```

## Dependencies

### Core Dependencies
- `express`: Web framework
- `mongoose`: MongoDB ODM
- `cors`: Cross-origin resource sharing
- `dotenv`: Environment variables

### Optional Dependencies
- `openai`: Advanced AI features
- `jsonwebtoken`: JWT authentication
- `bcryptjs`: Password hashing

## Development Workflow

### Setup
1. Install dependencies: `npm install`
2. Configure environment variables
3. Set up MongoDB connection
4. Run development server: `npm run dev`

### Code Changes
1. Follow code style guidelines
2. Write tests for new features
3. Update documentation
4. Test locally before committing

## AI Assistant Instructions

When providing code suggestions:
1. Follow the established patterns and conventions
2. Include error handling
3. Add comments for complex logic
4. Consider performance implications
5. Suggest optimizations when relevant
6. Recommend best practices
7. Consider scalability

## Future Considerations

### Planned Enhancements
- Advanced AI features
- Real-time updates
- Analytics dashboard
- Multi-language support

### Scalability
- Design for horizontal scaling
- Implement caching strategies
- Use message queues for async operations
- Monitor and optimize performance

---

**Last Updated:** 2024  
**Maintained By:** Development Team
