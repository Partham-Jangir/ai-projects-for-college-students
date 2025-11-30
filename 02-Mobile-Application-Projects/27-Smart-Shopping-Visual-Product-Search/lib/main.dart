import 'package:flutter/material.dart';

void main() {
  runApp(const SmartShoppingApp());
}

class SmartShoppingApp extends StatelessWidget {
  const SmartShoppingApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Smart Shopping - Visual Search',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(
          seedColor: Colors.deepPurple,
          brightness: Brightness.dark,
        ),
        useMaterial3: true,
      ),
      home: const HomePage(),
    );
  }
}

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  bool _isSearching = false;
  List<Product> _searchResults = [];
  String _searchStatus = '';

  // Sample products database
  final List<Product> _products = [
    Product(
      id: '1',
      name: 'Nike Air Max 90',
      category: 'Shoes',
      price: 129.99,
      imageUrl: 'https://example.com/nike.jpg',
      similarity: 0.95,
    ),
    Product(
      id: '2',
      name: 'Adidas Ultraboost',
      category: 'Shoes',
      price: 149.99,
      imageUrl: 'https://example.com/adidas.jpg',
      similarity: 0.87,
    ),
    Product(
      id: '3',
      name: 'Puma RS-X',
      category: 'Shoes',
      price: 109.99,
      imageUrl: 'https://example.com/puma.jpg',
      similarity: 0.82,
    ),
  ];

  void _simulateVisualSearch() {
    setState(() {
      _isSearching = true;
      _searchStatus = 'Analyzing image...';
    });

    // Simulate AI processing
    Future.delayed(const Duration(seconds: 1), () {
      setState(() {
        _searchStatus = 'Identifying objects...';
      });
    });

    Future.delayed(const Duration(seconds: 2), () {
      setState(() {
        _searchStatus = 'Finding similar products...';
      });
    });

    Future.delayed(const Duration(seconds: 3), () {
      setState(() {
        _isSearching = false;
        _searchResults = _products;
        _searchStatus = '';
      });
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('🛍️ Smart Shopping'),
        centerTitle: true,
        elevation: 0,
      ),
      body: Column(
        children: [
          // Visual Search Button
          Container(
            margin: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              gradient: LinearGradient(
                colors: [Colors.deepPurple, Colors.purple.shade300],
              ),
              borderRadius: BorderRadius.circular(20),
              boxShadow: [
                BoxShadow(
                  color: Colors.deepPurple.withOpacity(0.3),
                  blurRadius: 15,
                  offset: const Offset(0, 8),
                ),
              ],
            ),
            child: Material(
              color: Colors.transparent,
              child: InkWell(
                onTap: _isSearching ? null : _simulateVisualSearch,
                borderRadius: BorderRadius.circular(20),
                child: Container(
                  padding: const EdgeInsets.all(30),
                  child: Column(
                    children: [
                      Icon(
                        _isSearching ? Icons.search : Icons.camera_alt,
                        size: 60,
                        color: Colors.white,
                      ),
                      const SizedBox(height: 15),
                      Text(
                        _isSearching ? _searchStatus : 'Tap to Search with Camera',
                        style: const TextStyle(
                          color: Colors.white,
                          fontSize: 18,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      const SizedBox(height: 8),
                      const Text(
                        'AI-powered visual product search',
                        style: TextStyle(color: Colors.white70),
                      ),
                      if (_isSearching)
                        const Padding(
                          padding: EdgeInsets.only(top: 15),
                          child: CircularProgressIndicator(color: Colors.white),
                        ),
                    ],
                  ),
                ),
              ),
            ),
          ),

          // Search Results
          Expanded(
            child: _searchResults.isEmpty
                ? const Center(
                    child: Text(
                      'Take a photo of any product\nto find similar items',
                      textAlign: TextAlign.center,
                      style: TextStyle(color: Colors.grey),
                    ),
                  )
                : ListView.builder(
                    padding: const EdgeInsets.symmetric(horizontal: 16),
                    itemCount: _searchResults.length,
                    itemBuilder: (context, index) {
                      final product = _searchResults[index];
                      return ProductCard(product: product);
                    },
                  ),
          ),
        ],
      ),
      bottomNavigationBar: BottomNavigationBar(
        items: const [
          BottomNavigationBarItem(icon: Icon(Icons.home), label: 'Home'),
          BottomNavigationBarItem(icon: Icon(Icons.camera_alt), label: 'Search'),
          BottomNavigationBarItem(icon: Icon(Icons.favorite), label: 'Wishlist'),
          BottomNavigationBarItem(icon: Icon(Icons.person), label: 'Profile'),
        ],
        currentIndex: 1,
        type: BottomNavigationBarType.fixed,
      ),
    );
  }
}

class Product {
  final String id;
  final String name;
  final String category;
  final double price;
  final String imageUrl;
  final double similarity;

  Product({
    required this.id,
    required this.name,
    required this.category,
    required this.price,
    required this.imageUrl,
    required this.similarity,
  });
}

class ProductCard extends StatelessWidget {
  final Product product;

  const ProductCard({super.key, required this.product});

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      decoration: BoxDecoration(
        color: Colors.grey.shade900,
        borderRadius: BorderRadius.circular(16),
      ),
      child: ListTile(
        contentPadding: const EdgeInsets.all(12),
        leading: Container(
          width: 70,
          height: 70,
          decoration: BoxDecoration(
            color: Colors.grey.shade800,
            borderRadius: BorderRadius.circular(12),
          ),
          child: const Icon(Icons.image, color: Colors.grey),
        ),
        title: Text(
          product.name,
          style: const TextStyle(fontWeight: FontWeight.bold),
        ),
        subtitle: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(product.category, style: TextStyle(color: Colors.grey.shade500)),
            const SizedBox(height: 4),
            Row(
              children: [
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                  decoration: BoxDecoration(
                    color: Colors.green.withOpacity(0.2),
                    borderRadius: BorderRadius.circular(10),
                  ),
                  child: Text(
                    '${(product.similarity * 100).toInt()}% match',
                    style: const TextStyle(color: Colors.green, fontSize: 12),
                  ),
                ),
              ],
            ),
          ],
        ),
        trailing: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.end,
          children: [
            Text(
              '\$${product.price}',
              style: const TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.bold,
                color: Colors.white,
              ),
            ),
            const Icon(Icons.arrow_forward_ios, size: 16, color: Colors.grey),
          ],
        ),
      ),
    );
  }
}

