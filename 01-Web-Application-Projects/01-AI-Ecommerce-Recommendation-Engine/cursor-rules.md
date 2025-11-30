# Cursor Rules Documentation
## AI-Powered E-commerce Recommendation Engine

This document explains the cursor rules and development guidelines for this project. These rules help AI assistants understand the project context and provide better code suggestions.

## Project Overview
This project is an AI-powered e-commerce recommendation engine that uses hybrid recommendation algorithms (content-based and collaborative filtering) to provide personalized product suggestions to users.

## Tech Stack
- **Backend Framework**: Node.js with Express.js
- **Database**: MongoDB with Mongoose ODM
- **AI/ML**: Custom recommendation algorithms
- **Authentication**: JWT tokens
- **Package Manager**: npm

## Code Style Guidelines

### JavaScript Conventions
- Use ES6+ features (arrow functions, destructuring, template literals)
- Prefer `const` over `let`, avoid `var`
- Use async/await for asynchronous operations
- Use camelCase for variables and functions
- Use PascalCase for classes and constructors

### Code Organization
- Keep functions small and focused (single responsibility principle)
- Separate concerns: routes, controllers, services, models
- Use meaningful variable and function names
- Add JSDoc comments for complex functions
- Group related functionality in modules

## File Structure
```
/
├── server.js              # Main application entry point
├── routes/                # API route definitions
│   ├── products.js
│   └── recommendations.js
├── controllers/           # Business logic handlers
│   ├── productController.js
│   └── recommendationController.js
├── services/              # Recommendation algorithms
│   ├── contentBasedFiltering.js
│   └── collaborativeFiltering.js
├── models/                # MongoDB schemas
│   └── Product.js
├── middleware/            # Express middleware
│   ├── auth.js
│   └── validation.js
├── utils/                 # Helper functions
└── config/                # Configuration files
    └── database.js
```

## AI/ML Development Guidelines

### Recommendation Algorithms
- Implement algorithms in separate service files
- Document algorithm logic with clear comments
- Handle edge cases: new users, sparse data, cold start problem
- Optimize for performance (cache results when possible)
- Test with sample datasets to verify accuracy

### Algorithm Parameters
- Document all tunable parameters
- Provide default values with explanations
- Allow configuration through environment variables
- Test different parameter combinations

## API Development Standards

### RESTful Conventions
- Use proper HTTP methods (GET, POST, PUT, DELETE)
- Use consistent URL patterns (`/api/resource/:id`)
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
- Use appropriate HTTP status codes (400, 401, 404, 500)

## Database Guidelines

### MongoDB Best Practices
- Use Mongoose schemas with validation
- Create indexes for frequently queried fields
- Use aggregation pipelines for complex queries
- Implement connection pooling
- Handle connection errors gracefully

### Schema Design
- Design schemas for query patterns
- Use appropriate data types
- Add indexes for performance
- Consider data relationships

## Security Best Practices

### Input Validation
- Validate all user inputs
- Sanitize data before database operations
- Use parameterized queries
- Implement rate limiting

### Authentication & Authorization
- Use JWT tokens for authentication
- Implement token expiration
- Hash passwords with bcryptjs
- Protect sensitive endpoints

### Data Protection
- Use environment variables for secrets
- Implement CORS properly
- Protect against XSS attacks
- Use HTTPS in production

## Performance Optimization

### Caching Strategy
- Cache frequently accessed recommendations
- Use Redis for distributed caching (future)
- Implement cache invalidation strategies
- Cache trending products

### Database Optimization
- Create indexes on frequently queried fields
- Use aggregation pipelines efficiently
- Implement pagination for large datasets
- Monitor slow queries

### Algorithm Optimization
- Optimize similarity calculations
- Use efficient data structures
- Minimize database queries
- Batch operations when possible

## Testing Approach

### Unit Testing
- Test recommendation algorithms with sample data
- Test utility functions
- Test error handling
- Test edge cases

### Integration Testing
- Test API endpoints
- Test database operations
- Test authentication flows
- Test recommendation generation

### Performance Testing
- Load test API endpoints
- Test with large datasets
- Monitor response times
- Test concurrent user scenarios

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

### Custom Error Classes
- Create specific error types for different scenarios
- Include error codes and messages
- Log errors appropriately
- Return user-friendly error messages

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

### Service Layer Pattern
- Keep business logic in service files
- Services handle algorithm logic
- Controllers call services
- Services return data, controllers format responses

## Dependencies

### Core Dependencies
- `express`: Web framework
- `mongoose`: MongoDB ODM
- `jsonwebtoken`: JWT authentication
- `bcryptjs`: Password hashing
- `cors`: Cross-origin resource sharing
- `dotenv`: Environment variables

### Optional Dependencies
- `openai`: Advanced AI features
- `redis`: Caching (future)
- `winston`: Logging (future)

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

### Best Practices
- Commit frequently with clear messages
- Write self-documenting code
- Add comments for complex logic
- Keep functions focused and testable
- Refactor when needed

## AI Assistant Instructions

When providing code suggestions:
1. Follow the established patterns and conventions
2. Include error handling
3. Add comments for complex logic
4. Consider performance implications
5. Suggest optimizations when relevant
6. Recommend best practices
7. Consider scalability
8. Help with algorithm improvements

## Future Considerations

### Planned Enhancements
- React.js frontend
- OpenAI integration
- Real-time analytics
- A/B testing framework
- Advanced ML models
- Image-based recommendations

### Scalability
- Design for horizontal scaling
- Consider microservices architecture
- Implement caching strategies
- Use message queues for async operations
- Monitor and optimize performance

---

**Last Updated:** 2024  
**Maintained By:** Development Team

