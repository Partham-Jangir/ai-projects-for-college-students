const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Sample product data
const products = [
  { id: 1, name: "Wireless Headphones", category: "Electronics", price: 99.99, tags: ["audio", "wireless", "music"], rating: 4.5 },
  { id: 2, name: "Smart Watch", category: "Electronics", price: 249.99, tags: ["wearable", "fitness", "smart"], rating: 4.7 },
  { id: 3, name: "Running Shoes", category: "Sports", price: 129.99, tags: ["fitness", "running", "sports"], rating: 4.3 },
  { id: 4, name: "Yoga Mat", category: "Sports", price: 39.99, tags: ["fitness", "yoga", "wellness"], rating: 4.6 },
  { id: 5, name: "Coffee Maker", category: "Kitchen", price: 79.99, tags: ["coffee", "kitchen", "appliance"], rating: 4.4 },
  { id: 6, name: "Bluetooth Speaker", category: "Electronics", price: 59.99, tags: ["audio", "wireless", "portable"], rating: 4.2 },
  { id: 7, name: "Fitness Tracker", category: "Electronics", price: 89.99, tags: ["wearable", "fitness", "health"], rating: 4.5 },
  { id: 8, name: "Protein Powder", category: "Health", price: 49.99, tags: ["fitness", "nutrition", "health"], rating: 4.1 },
];

// User interaction history (simulated)
let userHistory = {};

// AI Recommendation Engine
class RecommendationEngine {
  constructor(products) {
    this.products = products;
  }

  // Content-based filtering
  getContentBasedRecommendations(productId, limit = 5) {
    const product = this.products.find(p => p.id === productId);
    if (!product) return [];

    const scores = this.products
      .filter(p => p.id !== productId)
      .map(p => ({
        product: p,
        score: this.calculateSimilarity(product, p)
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);

    return scores.map(s => ({ ...s.product, similarityScore: s.score }));
  }

  // Calculate similarity between two products
  calculateSimilarity(product1, product2) {
    let score = 0;
    
    // Category match
    if (product1.category === product2.category) score += 3;
    
    // Tag overlap
    const commonTags = product1.tags.filter(tag => product2.tags.includes(tag));
    score += commonTags.length * 2;
    
    // Price range similarity
    const priceDiff = Math.abs(product1.price - product2.price);
    if (priceDiff < 50) score += 2;
    else if (priceDiff < 100) score += 1;
    
    // Rating similarity
    const ratingDiff = Math.abs(product1.rating - product2.rating);
    if (ratingDiff < 0.5) score += 1;

    return score;
  }

  // Collaborative filtering (simplified)
  getCollaborativeRecommendations(userId, limit = 5) {
    const history = userHistory[userId] || [];
    if (history.length === 0) {
      // Return popular products for new users
      return this.products
        .sort((a, b) => b.rating - a.rating)
        .slice(0, limit);
    }

    // Get recommendations based on viewed products
    const recommendations = new Map();
    history.forEach(productId => {
      const similar = this.getContentBasedRecommendations(productId, 3);
      similar.forEach(product => {
        if (!history.includes(product.id)) {
          const current = recommendations.get(product.id) || { product, score: 0 };
          current.score += product.similarityScore;
          recommendations.set(product.id, current);
        }
      });
    });

    return Array.from(recommendations.values())
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map(r => r.product);
  }

  // Trending products
  getTrendingProducts(limit = 5) {
    return this.products
      .sort((a, b) => b.rating - a.rating)
      .slice(0, limit);
  }
}

const engine = new RecommendationEngine(products);

// API Routes

// Get all products
app.get('/api/products', (req, res) => {
  res.json({ success: true, products });
});

// Get single product
app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }
  res.json({ success: true, product });
});

// Get similar products (content-based recommendations)
app.get('/api/recommendations/similar/:productId', (req, res) => {
  const productId = parseInt(req.params.productId);
  const limit = parseInt(req.query.limit) || 5;
  const recommendations = engine.getContentBasedRecommendations(productId, limit);
  res.json({ success: true, recommendations });
});

// Get personalized recommendations for user
app.get('/api/recommendations/user/:userId', (req, res) => {
  const userId = req.params.userId;
  const limit = parseInt(req.query.limit) || 5;
  const recommendations = engine.getCollaborativeRecommendations(userId, limit);
  res.json({ success: true, recommendations });
});

// Get trending products
app.get('/api/recommendations/trending', (req, res) => {
  const limit = parseInt(req.query.limit) || 5;
  const trending = engine.getTrendingProducts(limit);
  res.json({ success: true, trending });
});

// Track user product view
app.post('/api/track/view', (req, res) => {
  const { userId, productId } = req.body;
  if (!userHistory[userId]) {
    userHistory[userId] = [];
  }
  if (!userHistory[userId].includes(productId)) {
    userHistory[userId].push(productId);
  }
  res.json({ success: true, message: 'View tracked' });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'AI E-commerce Recommendation Engine is running!' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 AI Recommendation Engine initialized with ${products.length} products`);
});

