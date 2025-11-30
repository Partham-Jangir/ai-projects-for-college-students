# 🛍️ Smart Shopping App with Visual Product Search

A Flutter-based shopping app with AI-powered visual search that lets users find products by taking photos.

## 🎯 Features

- **Visual Search**: Take a photo to find similar products
- **AI Image Recognition**: Identifies objects in photos
- **Similarity Matching**: Ranks products by visual similarity
- **Product Catalog**: Browse and filter products
- **Wishlist**: Save favorite items
- **Price Comparison**: Find best deals

## 🛠️ Tech Stack

- **Framework**: Flutter / Dart
- **AI**: TensorFlow Lite for on-device ML
- **Backend**: Firebase / Custom API
- **Image Processing**: Google ML Kit

## 📦 Installation

```bash
# Get dependencies
flutter pub get

# Run on device/emulator
flutter run

# Build for production
flutter build apk
flutter build ios
```

## 🧠 AI Pipeline

```
Camera Input → Image Preprocessing → Feature Extraction → 
Embedding Generation → Similarity Search → Product Results
```

## 📁 Project Structure

```
lib/
├── main.dart                 # App entry point
├── screens/
│   ├── home_screen.dart      # Home page
│   ├── search_screen.dart    # Visual search
│   └── product_screen.dart   # Product details
├── services/
│   ├── ai_service.dart       # ML processing
│   ├── api_service.dart      # Backend calls
│   └── camera_service.dart   # Camera handling
├── models/
│   └── product.dart          # Data models
└── widgets/
    └── product_card.dart     # UI components
```

## 🔧 Configuration

```yaml
# pubspec.yaml dependencies
dependencies:
  flutter:
    sdk: flutter
  camera: ^0.10.5
  tflite_flutter: ^0.10.0
  firebase_ml_vision: ^0.12.0
```

## 📝 License

MIT License - Team Akrix

