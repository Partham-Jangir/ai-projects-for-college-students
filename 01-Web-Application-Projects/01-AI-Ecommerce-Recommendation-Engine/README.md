# 🛒 AI-Powered E-commerce Recommendation Engine

An intelligent e-commerce platform with AI-driven product recommendations using content-based and collaborative filtering algorithms.

## 🎯 Features

- **Content-Based Filtering**: Recommends products similar to what users have viewed
- **Collaborative Filtering**: Personalized recommendations based on user behavior
- **Trending Products**: Shows popular products based on ratings
- **User Tracking**: Tracks product views to improve recommendations
- **RESTful API**: Clean API architecture for frontend integration

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **AI/ML**: Custom recommendation algorithms
- **Database**: MongoDB (optional, can use in-memory for demo)
- **Frontend**: React.js (to be added)

## 📦 Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Start production server
npm start
```

## 🔗 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Get all products |
| GET | `/api/products/:id` | Get single product |
| GET | `/api/recommendations/similar/:productId` | Get similar products |
| GET | `/api/recommendations/user/:userId` | Get personalized recommendations |
| GET | `/api/recommendations/trending` | Get trending products |
| POST | `/api/track/view` | Track user product view |

## 🧠 AI Algorithm

The recommendation engine uses a hybrid approach:

1. **Content-Based Filtering**
   - Analyzes product attributes (category, tags, price range)
   - Calculates similarity scores between products
   - Returns most similar items

2. **Collaborative Filtering**
   - Tracks user behavior and preferences
   - Finds patterns in user interactions
   - Recommends products based on similar users

## 📈 Future Enhancements

- [ ] Add React.js frontend with beautiful UI
- [ ] Integrate OpenAI for natural language search
- [ ] Add user authentication (JWT)
- [ ] Implement A/B testing for recommendations
- [ ] Add real-time analytics dashboard

## 🚀 Getting Started

1. Clone the repository
2. Run `npm install`
3. Run `npm run dev`
4. Open http://localhost:5000/api/health

## 📝 License

MIT License - Team Akrix

