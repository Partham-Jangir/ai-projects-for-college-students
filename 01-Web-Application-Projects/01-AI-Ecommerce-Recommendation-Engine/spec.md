# Technical Specification - AI E-commerce Recommendation Engine

## 1. Introduction

### 1.1 Purpose
This document provides detailed technical specifications for the AI-Powered E-commerce Recommendation Engine, covering system architecture, algorithms, data structures, API contracts, and implementation guidelines.

### 1.2 Scope
The specification covers:
- Backend API architecture
- AI/ML recommendation algorithms
- Database schemas and relationships
- API endpoint contracts
- Security implementation
- Performance requirements

### 1.3 Definitions

| Term | Definition |
|------|------------|
| Content-Based Filtering | Recommendation based on product attribute similarity |
| Collaborative Filtering | Recommendation based on user behavior patterns |
| Cold Start | Scenario where new user/product has no historical data |
| Cosine Similarity | Metric measuring similarity between two vectors |
| User-Item Matrix | Matrix representing user interactions with products |

---

## 2. System Architecture

### 2.1 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           CLIENT LAYER                                   │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐    │
│  │  Web App    │  │  Mobile App │  │  Admin UI   │  │  3rd Party  │    │
│  │  (React)    │  │  (Future)   │  │  (Future)   │  │  (API)      │    │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘    │
└─────────┼────────────────┼────────────────┼────────────────┼───────────┘
          │                │                │                │
          └────────────────┴────────────────┴────────────────┘
                                   │
                                   ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                          API GATEWAY                                     │
│  ┌────────────────────────────────────────────────────────────────────┐ │
│  │                    NGINX / Load Balancer                            │ │
│  │            (Rate Limiting, SSL Termination, Caching)                │ │
│  └────────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────┘
                                   │
                                   ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                       APPLICATION LAYER                                  │
│  ┌────────────────────────────────────────────────────────────────────┐ │
│  │                   Express.js API Server                             │ │
│  │  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐                │ │
│  │  │  Middleware  │ │   Routes     │ │  Controllers │                │ │
│  │  │  (Auth,CORS) │ │              │ │              │                │ │
│  │  └──────────────┘ └──────────────┘ └──────────────┘                │ │
│  └────────────────────────────────────────────────────────────────────┘ │
│                                                                          │
│  ┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐        │
│  │  Product Service │ │ Tracking Service │ │  Auth Service    │        │
│  └──────────────────┘ └──────────────────┘ └──────────────────┘        │
└─────────────────────────────────────────────────────────────────────────┘
                                   │
                                   ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                    RECOMMENDATION ENGINE LAYER                           │
│  ┌────────────────────────────────────────────────────────────────────┐ │
│  │              Hybrid Recommendation Orchestrator                     │ │
│  └────────────────────────────────────────────────────────────────────┘ │
│          ┌────────────────────┼────────────────────┐                    │
│          ▼                    ▼                    ▼                    │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐              │
│  │  Content     │    │ Collaborative│    │  Trending    │              │
│  │  Based       │    │  Filtering   │    │  Calculator  │              │
│  │  Filter      │    │              │    │              │              │
│  └──────────────┘    └──────────────┘    └──────────────┘              │
└─────────────────────────────────────────────────────────────────────────┘
                                   │
                                   ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                          DATA LAYER                                      │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐      │
│  │    MongoDB       │  │    Redis         │  │  In-Memory       │      │
│  │  (Primary DB)    │  │  (Cache Layer)   │  │  (Demo Mode)     │      │
│  │                  │  │                  │  │                  │      │
│  │  • Products      │  │  • Sessions      │  │  • Sample Data   │      │
│  │  • Users         │  │  • Hot Data      │  │  • Quick Tests   │      │
│  │  • Interactions  │  │  • Trending      │  │                  │      │
│  └──────────────────┘  └──────────────────┘  └──────────────────┘      │
└─────────────────────────────────────────────────────────────────────────┘
```

### 2.2 Component Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        server.js                                 │
│                     (Entry Point)                                │
└──────────────────────────┬──────────────────────────────────────┘
                           │
         ┌─────────────────┼─────────────────┐
         ▼                 ▼                 ▼
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│  routes/    │    │ middleware/ │    │  config/    │
│             │    │             │    │             │
│ • products  │    │ • auth      │    │ • database  │
│ • recommend │    │ • validator │    │ • env       │
│ • tracking  │    │ • error     │    │             │
│ • auth      │    │ • rateLimit │    │             │
└──────┬──────┘    └─────────────┘    └─────────────┘
       │
       ▼
┌─────────────────────────────────────────────────────────────────┐
│                        services/                                 │
│  ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐   │
│  │ recommendation  │ │ contentBased    │ │ collaborative   │   │
│  │ Engine.js       │ │ Filter.js       │ │ Filter.js       │   │
│  │                 │ │                 │ │                 │   │
│  │ orchestrates    │ │ product         │ │ user behavior   │   │
│  │ all algorithms  │ │ similarity      │ │ similarity      │   │
│  └─────────────────┘ └─────────────────┘ └─────────────────┘   │
│  ┌─────────────────┐ ┌─────────────────┐                       │
│  │ tracking        │ │ trending        │                       │
│  │ Service.js      │ │ Service.js      │                       │
│  └─────────────────┘ └─────────────────┘                       │
└──────────────────────────────┬──────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                         models/                                  │
│  ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐   │
│  │   Product.js    │ │    User.js      │ │  Interaction.js │   │
│  └─────────────────┘ └─────────────────┘ └─────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

---

## 3. Data Models

### 3.1 Product Schema

```javascript
const ProductSchema = new Schema({
  // Core Information
  _id: { type: ObjectId, auto: true },
  sku: { type: String, unique: true, index: true },
  name: { 
    type: String, 
    required: true, 
    minlength: 2, 
    maxlength: 200,
    index: 'text'
  },
  description: { 
    type: String, 
    maxlength: 5000 
  },
  
  // Categorization (for content-based filtering)
  category: { 
    type: String, 
    required: true, 
    enum: ['Electronics', 'Clothing', 'Books', 'Home & Kitchen', 
           'Sports & Outdoors', 'Beauty', 'Toys', 'Automotive'],
    index: true
  },
  subCategory: { type: String },
  tags: { 
    type: [String], 
    default: [],
    validate: [arrayLimit, '{PATH} exceeds limit of 20']
  },
  brand: { type: String, index: true },
  
  // Pricing
  price: { 
    type: Number, 
    required: true, 
    min: 0 
  },
  originalPrice: { type: Number },
  currency: { type: String, default: 'USD' },
  
  // Metrics (for trending calculation)
  rating: { 
    type: Number, 
    min: 0, 
    max: 5, 
    default: 0 
  },
  reviewCount: { type: Number, default: 0 },
  viewCount: { type: Number, default: 0 },
  purchaseCount: { type: Number, default: 0 },
  
  // Media
  images: [{ 
    url: String, 
    alt: String, 
    isPrimary: Boolean 
  }],
  
  // Inventory
  stock: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  
  // Feature Vector (pre-computed for performance)
  featureVector: {
    categoryIndex: Number,
    priceNormalized: Number,
    tagVector: [Number],
    popularityScore: Number
  },
  
  // Timestamps
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Indexes for query optimization
ProductSchema.index({ category: 1, rating: -1 });
ProductSchema.index({ price: 1, category: 1 });
ProductSchema.index({ tags: 1 });
ProductSchema.index({ viewCount: -1, purchaseCount: -1 });
```

### 3.2 User Schema

```javascript
const UserSchema = new Schema({
  // Identity
  _id: { type: ObjectId, auto: true },
  email: { 
    type: String, 
    required: true, 
    unique: true,
    lowercase: true,
    index: true
  },
  passwordHash: { type: String, required: true },
  
  // Profile
  profile: {
    firstName: String,
    lastName: String,
    avatar: String,
    dateOfBirth: Date
  },
  
  // Preferences (explicit)
  preferences: {
    favoriteCategories: [String],
    priceRange: {
      min: { type: Number, default: 0 },
      max: { type: Number, default: 10000 }
    },
    favoriteBrands: [String],
    excludedCategories: [String]
  },
  
  // Behavior History (for collaborative filtering)
  viewHistory: [{
    productId: { type: ObjectId, ref: 'Product' },
    timestamp: { type: Date, default: Date.now },
    duration: Number // seconds spent viewing
  }],
  
  purchaseHistory: [{
    productId: { type: ObjectId, ref: 'Product' },
    timestamp: { type: Date, default: Date.now },
    amount: Number
  }],
  
  cartHistory: [{
    productId: { type: ObjectId, ref: 'Product' },
    addedAt: Date,
    removedAt: Date,
    converted: Boolean
  }],
  
  // Computed preference vector
  preferenceVector: {
    categoryWeights: { type: Map, of: Number },
    pricePreference: Number,
    brandAffinities: { type: Map, of: Number }
  },
  
  // Account
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  isActive: { type: Boolean, default: true },
  lastLogin: Date,
  createdAt: { type: Date, default: Date.now }
});
```

### 3.3 UserInteraction Schema

```javascript
const UserInteractionSchema = new Schema({
  // References
  userId: { 
    type: String, 
    required: true, 
    index: true 
  },
  productId: { 
    type: ObjectId, 
    ref: 'Product', 
    required: true,
    index: true
  },
  
  // Interaction Details
  interactionType: { 
    type: String, 
    required: true,
    enum: ['view', 'click', 'add_to_cart', 'remove_from_cart', 
           'wishlist', 'purchase', 'review', 'share'],
    index: true
  },
  
  // Context
  sessionId: { type: String, index: true },
  deviceType: { type: String, enum: ['desktop', 'mobile', 'tablet'] },
  referrer: String,
  
  // Metrics
  duration: Number, // for views
  scrollDepth: Number, // percentage of page scrolled
  
  // Timestamp
  timestamp: { type: Date, default: Date.now, index: true }
});

// Compound indexes for efficient queries
UserInteractionSchema.index({ userId: 1, interactionType: 1, timestamp: -1 });
UserInteractionSchema.index({ productId: 1, interactionType: 1, timestamp: -1 });
UserInteractionSchema.index({ timestamp: -1 });
```

---

## 4. Algorithm Specifications

### 4.1 Content-Based Filtering

#### 4.1.1 Feature Extraction

```javascript
/**
 * Extracts feature vector from product attributes
 * @param {Product} product - Product document
 * @returns {Object} Feature vector with normalized values
 */
function extractFeatureVector(product) {
  return {
    // Category as one-hot encoded index
    categoryIndex: CATEGORY_MAP[product.category],
    
    // Price normalized to 0-1 range
    priceNormalized: normalizePrice(product.price, PRICE_RANGE),
    
    // Tags as binary vector
    tagVector: encodeTagsAsBinaryVector(product.tags, TAG_VOCABULARY),
    
    // Brand encoding
    brandIndex: BRAND_MAP[product.brand] || 0,
    
    // Popularity score
    popularityScore: calculatePopularityScore(product)
  };
}

/**
 * Normalizes price to 0-1 range
 */
function normalizePrice(price, range) {
  return Math.min(1, Math.max(0, (price - range.min) / (range.max - range.min)));
}
```

#### 4.1.2 Similarity Calculation

```javascript
/**
 * Calculates similarity between two products
 * Uses weighted combination of multiple similarity metrics
 */
const FEATURE_WEIGHTS = {
  category: 0.35,      // Same category is highly important
  tags: 0.30,          // Shared tags indicate similarity
  priceRange: 0.20,    // Similar price point
  brand: 0.10,         // Same brand adds affinity
  popularity: 0.05     // Similar popularity level
};

function calculateProductSimilarity(productA, productB) {
  let totalScore = 0;
  
  // Category similarity (binary: 0 or 1)
  const categorySim = productA.category === productB.category ? 1 : 0;
  totalScore += categorySim * FEATURE_WEIGHTS.category;
  
  // Tag similarity (Jaccard coefficient)
  const tagSim = jaccardSimilarity(productA.tags, productB.tags);
  totalScore += tagSim * FEATURE_WEIGHTS.tags;
  
  // Price similarity (inverse normalized distance)
  const priceSim = 1 - Math.abs(
    productA.featureVector.priceNormalized - 
    productB.featureVector.priceNormalized
  );
  totalScore += priceSim * FEATURE_WEIGHTS.priceRange;
  
  // Brand similarity (binary)
  const brandSim = productA.brand === productB.brand ? 1 : 0;
  totalScore += brandSim * FEATURE_WEIGHTS.brand;
  
  // Popularity similarity
  const popSim = 1 - Math.abs(
    productA.featureVector.popularityScore - 
    productB.featureVector.popularityScore
  );
  totalScore += popSim * FEATURE_WEIGHTS.popularity;
  
  return totalScore;
}

/**
 * Jaccard similarity coefficient for tag comparison
 */
function jaccardSimilarity(tagsA, tagsB) {
  const setA = new Set(tagsA);
  const setB = new Set(tagsB);
  const intersection = new Set([...setA].filter(x => setB.has(x)));
  const union = new Set([...setA, ...setB]);
  
  return union.size === 0 ? 0 : intersection.size / union.size;
}
```

#### 4.1.3 Similar Products Algorithm

```javascript
/**
 * Finds similar products using content-based filtering
 * Time Complexity: O(n log k) where n = total products, k = limit
 * 
 * @param {string} productId - Source product ID
 * @param {number} limit - Number of recommendations (default: 10)
 * @param {Object} options - Additional filtering options
 * @returns {Array<Product>} Sorted array of similar products
 */
async function findSimilarProducts(productId, limit = 10, options = {}) {
  const sourceProduct = await Product.findById(productId);
  if (!sourceProduct) throw new NotFoundError('Product not found');
  
  // Query candidates (same category + nearby categories)
  const candidates = await Product.find({
    _id: { $ne: productId },
    isActive: true,
    category: { $in: getRelatedCategories(sourceProduct.category) },
    ...(options.priceRange && {
      price: { 
        $gte: options.priceRange.min, 
        $lte: options.priceRange.max 
      }
    })
  }).limit(500); // Cap candidates for performance
  
  // Calculate similarity scores
  const scoredProducts = candidates.map(candidate => ({
    product: candidate,
    similarity: calculateProductSimilarity(sourceProduct, candidate)
  }));
  
  // Sort by similarity and return top K
  return scoredProducts
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, limit)
    .filter(item => item.similarity >= MIN_SIMILARITY_THRESHOLD)
    .map(item => ({
      ...item.product.toObject(),
      similarityScore: item.similarity
    }));
}
```

### 4.2 Collaborative Filtering

#### 4.2.1 User-Item Matrix Construction

```javascript
/**
 * Builds user-item interaction matrix
 * Matrix entry represents interaction strength (0-1)
 */
async function buildUserItemMatrix(userIds, timeWindow = 30) {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - timeWindow);
  
  // Fetch all interactions in time window
  const interactions = await UserInteraction.find({
    userId: { $in: userIds },
    timestamp: { $gte: cutoffDate }
  });
  
  // Build matrix
  const matrix = {};
  const productSet = new Set();
  
  interactions.forEach(interaction => {
    if (!matrix[interaction.userId]) {
      matrix[interaction.userId] = {};
    }
    
    // Weight by interaction type
    const weight = INTERACTION_WEIGHTS[interaction.interactionType];
    const currentScore = matrix[interaction.userId][interaction.productId] || 0;
    matrix[interaction.userId][interaction.productId] = Math.min(1, currentScore + weight);
    
    productSet.add(interaction.productId.toString());
  });
  
  return { matrix, products: Array.from(productSet) };
}

const INTERACTION_WEIGHTS = {
  view: 0.1,
  click: 0.2,
  add_to_cart: 0.4,
  wishlist: 0.3,
  purchase: 1.0,
  review: 0.5
};
```

#### 4.2.2 User Similarity Calculation

```javascript
/**
 * Calculates Pearson correlation coefficient between two users
 * Based on their product interaction patterns
 */
function pearsonCorrelation(userAVector, userBVector, commonProducts) {
  if (commonProducts.length < MIN_COMMON_PRODUCTS) return 0;
  
  // Calculate means
  const meanA = commonProducts.reduce((sum, p) => sum + userAVector[p], 0) / commonProducts.length;
  const meanB = commonProducts.reduce((sum, p) => sum + userBVector[p], 0) / commonProducts.length;
  
  // Calculate correlation components
  let numerator = 0;
  let denominatorA = 0;
  let denominatorB = 0;
  
  commonProducts.forEach(product => {
    const diffA = userAVector[product] - meanA;
    const diffB = userBVector[product] - meanB;
    
    numerator += diffA * diffB;
    denominatorA += diffA * diffA;
    denominatorB += diffB * diffB;
  });
  
  const denominator = Math.sqrt(denominatorA) * Math.sqrt(denominatorB);
  
  return denominator === 0 ? 0 : numerator / denominator;
}

/**
 * Finds K most similar users
 */
async function findSimilarUsers(targetUserId, matrix, K = 20) {
  const targetVector = matrix[targetUserId];
  if (!targetVector) return []; // Cold start
  
  const targetProducts = Object.keys(targetVector);
  const similarities = [];
  
  for (const userId of Object.keys(matrix)) {
    if (userId === targetUserId) continue;
    
    const userVector = matrix[userId];
    const commonProducts = targetProducts.filter(p => userVector[p] !== undefined);
    
    const correlation = pearsonCorrelation(targetVector, userVector, commonProducts);
    
    if (correlation > MIN_USER_SIMILARITY) {
      similarities.push({ userId, similarity: correlation, commonCount: commonProducts.length });
    }
  }
  
  return similarities
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, K);
}
```

#### 4.2.3 Recommendation Generation

```javascript
/**
 * Generates recommendations using collaborative filtering
 * Aggregates preferences from similar users
 */
async function generateCollaborativeRecommendations(userId, limit = 10) {
  // Build matrix (cached in production)
  const activeUserIds = await getActiveUserIds(1000);
  const { matrix, products } = await buildUserItemMatrix(activeUserIds);
  
  // Find similar users
  const similarUsers = await findSimilarUsers(userId, matrix);
  
  if (similarUsers.length === 0) {
    return { recommendations: [], algorithm: 'fallback' };
  }
  
  // Aggregate product scores from similar users
  const productScores = {};
  const userVector = matrix[userId] || {};
  
  similarUsers.forEach(({ userId: simUserId, similarity }) => {
    const simUserVector = matrix[simUserId];
    
    Object.entries(simUserVector).forEach(([productId, score]) => {
      // Skip products user already interacted with
      if (userVector[productId]) return;
      
      if (!productScores[productId]) {
        productScores[productId] = { totalScore: 0, totalWeight: 0 };
      }
      
      productScores[productId].totalScore += score * similarity;
      productScores[productId].totalWeight += similarity;
    });
  });
  
  // Calculate weighted average scores
  const rankedProducts = Object.entries(productScores)
    .map(([productId, { totalScore, totalWeight }]) => ({
      productId,
      score: totalWeight > 0 ? totalScore / totalWeight : 0
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
  
  // Fetch product details
  const productIds = rankedProducts.map(p => p.productId);
  const products = await Product.find({ _id: { $in: productIds } });
  
  return {
    recommendations: products.map(product => ({
      ...product.toObject(),
      collaborativeScore: rankedProducts.find(p => p.productId === product._id.toString())?.score
    })),
    algorithm: 'collaborative',
    similarUsersCount: similarUsers.length
  };
}
```

### 4.3 Hybrid Recommendation Engine

```javascript
/**
 * Configuration for hybrid recommendation
 */
const HYBRID_CONFIG = {
  weights: {
    collaborative: 0.60,
    contentBased: 0.40
  },
  minScoreThreshold: 0.1,
  diversityFactor: 0.2, // Inject some diverse items
  fallbackChain: ['trending', 'popular', 'random']
};

/**
 * Main recommendation orchestrator
 * Combines multiple algorithms based on user context
 */
async function getHybridRecommendations(userId, context = {}) {
  const { currentProductId, limit = 10, excludeIds = [] } = context;
  
  // Determine user state
  const userHistory = await getUserInteractionCount(userId);
  const hasHistory = userHistory >= MIN_HISTORY_THRESHOLD;
  
  let recommendations = [];
  let algorithm = 'hybrid';
  
  try {
    if (hasHistory && currentProductId) {
      // Best case: User has history AND viewing a product
      const [collabRecs, contentRecs] = await Promise.all([
        generateCollaborativeRecommendations(userId, limit),
        findSimilarProducts(currentProductId, limit)
      ]);
      
      recommendations = mergeRecommendations(
        collabRecs.recommendations,
        contentRecs,
        HYBRID_CONFIG.weights
      );
    } else if (hasHistory) {
      // User has history but not viewing specific product
      const collabRecs = await generateCollaborativeRecommendations(userId, limit);
      recommendations = collabRecs.recommendations;
      algorithm = 'collaborative';
    } else if (currentProductId) {
      // New user viewing a product
      recommendations = await findSimilarProducts(currentProductId, limit);
      algorithm = 'content-based';
    } else {
      // Cold start: No history, no product context
      recommendations = await getTrendingProducts(limit);
      algorithm = 'trending';
    }
    
    // Apply exclusions
    recommendations = recommendations.filter(
      r => !excludeIds.includes(r._id.toString())
    );
    
    // Inject diversity if needed
    if (HYBRID_CONFIG.diversityFactor > 0) {
      recommendations = injectDiversity(recommendations, HYBRID_CONFIG.diversityFactor);
    }
    
    return {
      success: true,
      data: {
        recommendations: recommendations.slice(0, limit),
        algorithm,
        generatedAt: new Date().toISOString(),
        userId,
        context
      }
    };
  } catch (error) {
    // Fallback chain
    return executeFallbackChain(HYBRID_CONFIG.fallbackChain, limit);
  }
}

/**
 * Merges recommendations from multiple algorithms
 * Uses weighted scoring to combine results
 */
function mergeRecommendations(collabRecs, contentRecs, weights) {
  const scoreMap = new Map();
  
  // Add collaborative recommendations
  collabRecs.forEach((rec, index) => {
    const positionScore = 1 - (index / collabRecs.length);
    scoreMap.set(rec._id.toString(), {
      product: rec,
      score: positionScore * weights.collaborative,
      sources: ['collaborative']
    });
  });
  
  // Add content-based recommendations
  contentRecs.forEach((rec, index) => {
    const positionScore = 1 - (index / contentRecs.length);
    const existing = scoreMap.get(rec._id.toString());
    
    if (existing) {
      existing.score += positionScore * weights.contentBased;
      existing.sources.push('content-based');
    } else {
      scoreMap.set(rec._id.toString(), {
        product: rec,
        score: positionScore * weights.contentBased,
        sources: ['content-based']
      });
    }
  });
  
  // Sort by combined score
  return Array.from(scoreMap.values())
    .sort((a, b) => b.score - a.score)
    .map(item => ({
      ...item.product,
      hybridScore: item.score,
      recommendationSources: item.sources
    }));
}
```

### 4.4 Trending Products Algorithm

```javascript
/**
 * Calculates trending score with time decay
 * Recent interactions weighted higher than older ones
 */
const TRENDING_CONFIG = {
  weights: {
    views: 0.20,
    clicks: 0.25,
    addToCart: 0.25,
    purchases: 0.20,
    rating: 0.10
  },
  decayHalfLife: 3, // Days until score halves
  timeWindow: 7     // Days to consider
};

async function calculateTrendingScore(productId) {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - TRENDING_CONFIG.timeWindow);
  
  // Aggregate recent interactions
  const interactions = await UserInteraction.aggregate([
    {
      $match: {
        productId: mongoose.Types.ObjectId(productId),
        timestamp: { $gte: cutoff }
      }
    },
    {
      $group: {
        _id: '$interactionType',
        count: { $sum: 1 },
        avgTimestamp: { $avg: { $toLong: '$timestamp' } }
      }
    }
  ]);
  
  // Calculate score with time decay
  let totalScore = 0;
  const now = Date.now();
  
  interactions.forEach(({ _id: type, count, avgTimestamp }) => {
    const weight = TRENDING_CONFIG.weights[type] || 0;
    const daysSince = (now - avgTimestamp) / (1000 * 60 * 60 * 24);
    const decayFactor = Math.exp(-0.693 * daysSince / TRENDING_CONFIG.decayHalfLife);
    
    totalScore += count * weight * decayFactor;
  });
  
  // Add rating component
  const product = await Product.findById(productId);
  if (product) {
    totalScore += product.rating * TRENDING_CONFIG.weights.rating;
  }
  
  return totalScore;
}

/**
 * Gets trending products (cached with 1-hour TTL)
 */
async function getTrendingProducts(limit = 10) {
  const cacheKey = `trending:${limit}`;
  
  // Check cache
  const cached = await cache.get(cacheKey);
  if (cached) return JSON.parse(cached);
  
  // Calculate trending scores for active products
  const products = await Product.find({ isActive: true }).limit(200);
  
  const scoredProducts = await Promise.all(
    products.map(async product => ({
      product,
      trendingScore: await calculateTrendingScore(product._id)
    }))
  );
  
  const trending = scoredProducts
    .sort((a, b) => b.trendingScore - a.trendingScore)
    .slice(0, limit)
    .map(item => ({
      ...item.product.toObject(),
      trendingScore: item.trendingScore
    }));
  
  // Cache for 1 hour
  await cache.set(cacheKey, JSON.stringify(trending), 'EX', 3600);
  
  return trending;
}
```

---

## 5. API Specifications

### 5.1 REST API Endpoints

#### 5.1.1 Products API

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/products` | List products with pagination | No |
| GET | `/api/products/:id` | Get single product | No |
| POST | `/api/products` | Create product | Admin |
| PUT | `/api/products/:id` | Update product | Admin |
| DELETE | `/api/products/:id` | Delete product | Admin |

**GET /api/products**

Request:
```
GET /api/products?page=1&limit=20&category=Electronics&sort=-rating&search=laptop
```

Response:
```json
{
  "success": true,
  "data": [
    {
      "_id": "65abc123...",
      "name": "Premium Laptop Pro",
      "category": "Electronics",
      "price": 999.99,
      "rating": 4.7,
      "tags": ["laptop", "premium", "work"]
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 156,
    "pages": 8,
    "hasNext": true,
    "hasPrev": false
  },
  "filters": {
    "category": "Electronics",
    "sort": "-rating"
  }
}
```

#### 5.1.2 Recommendations API

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/recommendations/similar/:productId` | Get similar products | No |
| GET | `/api/recommendations/user/:userId` | Personalized recommendations | Optional |
| GET | `/api/recommendations/trending` | Trending products | No |
| POST | `/api/recommendations/context` | Context-aware recommendations | Optional |

**GET /api/recommendations/similar/:productId**

Request:
```
GET /api/recommendations/similar/65abc123?limit=10
```

Response:
```json
{
  "success": true,
  "data": {
    "source": {
      "_id": "65abc123...",
      "name": "Premium Laptop Pro"
    },
    "recommendations": [
      {
        "_id": "65xyz789...",
        "name": "Business Laptop Elite",
        "similarityScore": 0.89,
        "matchingAttributes": ["category", "tags", "priceRange"]
      }
    ],
    "algorithm": "content-based",
    "generatedAt": "2024-01-15T10:30:00Z"
  }
}
```

**POST /api/recommendations/context**

Request:
```json
{
  "userId": "user_123",
  "context": {
    "currentProductId": "65abc123",
    "cartItems": ["65def456", "65ghi789"],
    "sessionDuration": 300,
    "deviceType": "mobile",
    "timeOfDay": "evening"
  },
  "limit": 10,
  "excludeCategories": ["Books"]
}
```

Response:
```json
{
  "success": true,
  "data": {
    "recommendations": [...],
    "algorithm": "hybrid",
    "confidence": 0.85,
    "factors": {
      "userHistory": 0.6,
      "currentProduct": 0.3,
      "cartContext": 0.1
    }
  }
}
```

#### 5.1.3 Tracking API

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/track/view` | Track product view | No |
| POST | `/api/track/click` | Track product click | No |
| POST | `/api/track/cart` | Track cart action | No |
| POST | `/api/track/purchase` | Track purchase | Yes |

**POST /api/track/view**

Request:
```json
{
  "productId": "65abc123",
  "userId": "user_123",
  "sessionId": "sess_xyz789",
  "metadata": {
    "referrer": "search",
    "searchQuery": "laptop",
    "position": 3,
    "deviceType": "desktop"
  }
}
```

Response:
```json
{
  "success": true,
  "data": {
    "tracked": true,
    "interactionId": "int_abc123",
    "timestamp": "2024-01-15T10:30:00Z"
  }
}
```

### 5.2 Error Response Format

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid product ID format",
    "details": [
      {
        "field": "productId",
        "message": "Must be a valid MongoDB ObjectId"
      }
    ]
  },
  "requestId": "req_abc123",
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### 5.3 Error Codes

| Code | HTTP Status | Description |
|------|-------------|-------------|
| VALIDATION_ERROR | 400 | Invalid request parameters |
| UNAUTHORIZED | 401 | Missing or invalid authentication |
| FORBIDDEN | 403 | Insufficient permissions |
| NOT_FOUND | 404 | Resource not found |
| RATE_LIMITED | 429 | Too many requests |
| INTERNAL_ERROR | 500 | Server error |

---

## 6. Security Specifications

### 6.1 Authentication

```javascript
// JWT Token Structure
{
  header: {
    alg: "HS256",
    typ: "JWT"
  },
  payload: {
    userId: "user_123",
    email: "user@example.com",
    role: "user",
    iat: 1705312200,      // Issued at
    exp: 1705398600,      // Expires (24 hours)
    jti: "unique_token_id" // Token ID for revocation
  }
}

// Token Configuration
const JWT_CONFIG = {
  accessToken: {
    expiresIn: '24h',
    secret: process.env.JWT_SECRET
  },
  refreshToken: {
    expiresIn: '7d',
    secret: process.env.JWT_REFRESH_SECRET
  }
};
```

### 6.2 Rate Limiting

```javascript
const RATE_LIMITS = {
  // General API
  api: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100                   // requests per window
  },
  // Recommendation endpoints
  recommendations: {
    windowMs: 1 * 60 * 1000,  // 1 minute
    max: 30
  },
  // Tracking endpoints (higher limit)
  tracking: {
    windowMs: 1 * 60 * 1000,
    max: 60
  },
  // Authentication
  auth: {
    windowMs: 15 * 60 * 1000,
    max: 10
  }
};
```

### 6.3 Input Validation Schema

```javascript
// Product validation
const productValidation = {
  name: Joi.string().min(2).max(200).required(),
  description: Joi.string().max(5000),
  category: Joi.string().valid(...VALID_CATEGORIES).required(),
  tags: Joi.array().items(Joi.string().max(50)).max(20),
  price: Joi.number().min(0).required(),
  rating: Joi.number().min(0).max(5),
  brand: Joi.string().max(100)
};

// Tracking validation
const trackingValidation = {
  productId: Joi.string().regex(/^[a-f\d]{24}$/i).required(),
  userId: Joi.string().max(100),
  sessionId: Joi.string().max(100),
  interactionType: Joi.string().valid(...VALID_INTERACTIONS).required(),
  metadata: Joi.object({
    referrer: Joi.string().max(500),
    deviceType: Joi.string().valid('desktop', 'mobile', 'tablet'),
    searchQuery: Joi.string().max(200)
  })
};
```

---

## 7. Performance Specifications

### 7.1 Response Time Requirements

| Endpoint Category | Target (P50) | Target (P95) | Max |
|-------------------|--------------|--------------|-----|
| Product List | 50ms | 150ms | 300ms |
| Single Product | 20ms | 80ms | 150ms |
| Similar Products | 100ms | 250ms | 400ms |
| User Recommendations | 150ms | 350ms | 500ms |
| Trending Products | 50ms | 100ms | 200ms |
| Tracking Events | 20ms | 50ms | 100ms |

### 7.2 Caching Strategy

```javascript
const CACHE_CONFIG = {
  // Product data
  products: {
    ttl: 300,           // 5 minutes
    strategy: 'write-through'
  },
  // User-specific recommendations
  userRecommendations: {
    ttl: 600,           // 10 minutes
    strategy: 'cache-aside',
    keyPattern: 'rec:user:{userId}'
  },
  // Similar products
  similarProducts: {
    ttl: 1800,          // 30 minutes
    strategy: 'cache-aside',
    keyPattern: 'rec:similar:{productId}'
  },
  // Trending products
  trending: {
    ttl: 3600,          // 1 hour
    strategy: 'refresh-ahead',
    keyPattern: 'rec:trending'
  },
  // User interaction matrix (for collaborative filtering)
  interactionMatrix: {
    ttl: 900,           // 15 minutes
    strategy: 'scheduled-refresh'
  }
};
```

### 7.3 Scalability Targets

| Metric | Target |
|--------|--------|
| Concurrent Users | 1,000+ |
| Requests per Second | 500+ |
| Database Connections | 100 (pooled) |
| Cache Hit Ratio | > 70% |
| CPU Utilization | < 70% |
| Memory Utilization | < 80% |

---

## 8. Configuration

### 8.1 Environment Variables

```bash
# Server
NODE_ENV=development|staging|production
PORT=5000
HOST=0.0.0.0

# Database
MONGODB_URI=mongodb://localhost:27017/ecommerce_recommendations
MONGODB_OPTIONS={"useNewUrlParser":true,"useUnifiedTopology":true}

# Redis Cache
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=
REDIS_DB=0

# Authentication
JWT_SECRET=your-256-bit-secret-key
JWT_REFRESH_SECRET=your-refresh-secret-key
JWT_EXPIRES_IN=24h
BCRYPT_ROUNDS=12

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=100

# Recommendation Engine
REC_MIN_SIMILARITY=0.3
REC_MIN_COMMON_PRODUCTS=3
REC_COLLABORATIVE_WEIGHT=0.6
REC_CONTENT_WEIGHT=0.4

# External Services (Optional)
OPENAI_API_KEY=sk-...
```

### 8.2 Feature Flags

```javascript
const FEATURE_FLAGS = {
  enableCollaborativeFiltering: true,
  enableTrendingCache: true,
  enableDiversityInjection: true,
  enableRealTimeTracking: true,
  enableA8Testing: false,
  openAiEnhancement: false
};
```

---

## 9. Monitoring & Logging

### 9.1 Metrics to Track

```javascript
const METRICS = {
  // Business metrics
  recommendationCTR: 'recommendation_click_through_rate',
  conversionRate: 'recommendation_conversion_rate',
  
  // Technical metrics
  apiLatency: 'api_response_time_ms',
  cacheHitRate: 'cache_hit_ratio',
  algorithmAccuracy: 'recommendation_accuracy_score',
  
  // System metrics
  activeConnections: 'db_active_connections',
  memoryUsage: 'process_memory_bytes',
  cpuUsage: 'process_cpu_percent'
};
```

### 9.2 Log Format

```json
{
  "timestamp": "2024-01-15T10:30:00.000Z",
  "level": "info",
  "service": "recommendation-engine",
  "requestId": "req_abc123",
  "userId": "user_123",
  "action": "generate_recommendations",
  "algorithm": "hybrid",
  "duration": 145,
  "resultCount": 10,
  "metadata": {
    "cacheHit": true,
    "collaborativeWeight": 0.6
  }
}
```

---

**Document Version:** 1.0  
**Last Updated:** 2024  
**Technical Owner:** Engineering Team  
**Reviewers:** Tech Lead, AI/ML Team Lead

