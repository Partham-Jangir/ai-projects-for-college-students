# 🤖 Real-time AI Chatbot for Customer Support

A real-time AI-powered customer support chatbot with WebSocket communication, intent recognition, and smart response generation.

## 🎯 Features

- **Real-time Communication**: WebSocket-based instant messaging
- **Intent Recognition**: AI understands customer queries
- **Smart Responses**: Context-aware response generation
- **Quick Suggestions**: Pre-defined quick action buttons
- **Session Management**: Track conversation history
- **Analytics Dashboard**: Monitor active sessions

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js, Socket.IO
- **AI Engine**: Custom NLP intent classification
- **Frontend**: Embedded HTML/CSS/JS demo
- **Optional**: OpenAI GPT for advanced responses

## 📦 Installation

```bash
npm install
npm run dev
```

Then open http://localhost:5002 to see the chatbot demo!

## 🔗 Socket Events

| Event | Direction | Description |
|-------|-----------|-------------|
| `user_message` | Client → Server | User sends message |
| `bot_message` | Server → Client | Bot response |
| `typing` | Client → Server | User typing indicator |

## 🧠 Supported Intents

- Greetings (hello, hi, hey)
- Order Status (tracking, delivery)
- Return Policy (refunds, exchanges)
- Payment Methods
- Support Hours
- Product Information
- Complaints
- Thank You / Goodbye

## 📝 License

MIT License - Team Akrix

