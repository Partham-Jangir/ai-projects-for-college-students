const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*", methods: ["GET", "POST"] }
});

const PORT = process.env.PORT || 5002;

app.use(cors());
app.use(express.json());

// AI Chatbot Engine
class ChatbotEngine {
  constructor() {
    // Knowledge base for customer support
    this.knowledgeBase = {
      greeting: {
        patterns: ["hello", "hi", "hey", "good morning", "good evening"],
        responses: [
          "Hello! 👋 Welcome to our support. How can I help you today?",
          "Hi there! I'm your AI assistant. What can I do for you?",
          "Welcome! I'm here to help. What's on your mind?"
        ]
      },
      order_status: {
        patterns: ["order status", "where is my order", "track order", "delivery status", "shipping"],
        responses: [
          "I can help you track your order! Please provide your order number.",
          "To check your order status, I'll need your order ID. Could you share it?",
          "Let me help you find your order. What's your order number?"
        ]
      },
      return_policy: {
        patterns: ["return", "refund", "exchange", "money back", "return policy"],
        responses: [
          "Our return policy allows returns within 30 days of purchase. Items must be unused and in original packaging. Would you like to start a return?",
          "You can return most items within 30 days for a full refund. Need help with a specific return?"
        ]
      },
      payment: {
        patterns: ["payment", "pay", "credit card", "debit", "payment methods", "billing"],
        responses: [
          "We accept Visa, Mastercard, PayPal, and bank transfers. Is there a specific payment issue I can help with?",
          "Payment can be made via credit/debit cards, PayPal, or bank transfer. Having trouble with payment?"
        ]
      },
      support_hours: {
        patterns: ["hours", "timing", "when are you open", "business hours", "available"],
        responses: [
          "Our AI support is available 24/7! Human agents are available Mon-Fri, 9 AM - 6 PM EST.",
          "I'm here 24/7 to help! For complex issues, human support is available during business hours."
        ]
      },
      product_info: {
        patterns: ["product", "item", "details", "specifications", "features"],
        responses: [
          "I'd be happy to help with product information! Which product are you interested in?",
          "Sure! Tell me the product name or category, and I'll share the details."
        ]
      },
      complaint: {
        patterns: ["complaint", "problem", "issue", "not working", "broken", "damaged"],
        responses: [
          "I'm sorry to hear you're having issues. Let me help resolve this. Can you describe the problem?",
          "I apologize for any inconvenience. Please share the details, and I'll do my best to help.",
          "Sorry for the trouble! Tell me more about the issue, and I'll escalate if needed."
        ]
      },
      thanks: {
        patterns: ["thank you", "thanks", "appreciate", "helpful"],
        responses: [
          "You're welcome! 😊 Is there anything else I can help with?",
          "Happy to help! Let me know if you need anything else.",
          "Anytime! Feel free to reach out if you have more questions."
        ]
      },
      goodbye: {
        patterns: ["bye", "goodbye", "see you", "exit", "close"],
        responses: [
          "Goodbye! Have a great day! 👋",
          "Thanks for chatting! Take care!",
          "Bye! Feel free to come back anytime!"
        ]
      }
    };

    this.fallbackResponses = [
      "I'm not quite sure I understand. Could you rephrase that?",
      "Let me connect you with a human agent for better assistance.",
      "I'm still learning! Could you try asking differently?",
      "I want to help! Can you provide more details?"
    ];
  }

  // Process user message
  processMessage(message) {
    const lowerMessage = message.toLowerCase();
    
    // Check each category in knowledge base
    for (const [category, data] of Object.entries(this.knowledgeBase)) {
      for (const pattern of data.patterns) {
        if (lowerMessage.includes(pattern)) {
          const response = data.responses[Math.floor(Math.random() * data.responses.length)];
          return {
            response,
            category,
            confidence: 0.85,
            timestamp: new Date().toISOString()
          };
        }
      }
    }

    // Fallback response
    return {
      response: this.fallbackResponses[Math.floor(Math.random() * this.fallbackResponses.length)],
      category: "fallback",
      confidence: 0.3,
      timestamp: new Date().toISOString()
    };
  }

  // Get suggested responses
  getSuggestions() {
    return [
      "Track my order",
      "Return policy",
      "Payment methods",
      "Contact support"
    ];
  }
}

const chatbot = new ChatbotEngine();

// Active chat sessions
const sessions = new Map();

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log(`👤 User connected: ${socket.id}`);

  // Create session
  sessions.set(socket.id, {
    id: socket.id,
    startTime: new Date(),
    messages: []
  });

  // Send welcome message
  socket.emit('bot_message', {
    message: "Hello! 👋 I'm your AI support assistant. How can I help you today?",
    suggestions: chatbot.getSuggestions(),
    timestamp: new Date().toISOString()
  });

  // Handle user messages
  socket.on('user_message', (data) => {
    const { message } = data;
    console.log(`📩 Message from ${socket.id}: ${message}`);

    // Store message in session
    const session = sessions.get(socket.id);
    if (session) {
      session.messages.push({ role: 'user', content: message, time: new Date() });
    }

    // Process with AI
    const aiResponse = chatbot.processMessage(message);

    // Store bot response
    if (session) {
      session.messages.push({ role: 'bot', content: aiResponse.response, time: new Date() });
    }

    // Send response
    socket.emit('bot_message', {
      message: aiResponse.response,
      category: aiResponse.category,
      confidence: aiResponse.confidence,
      suggestions: chatbot.getSuggestions(),
      timestamp: aiResponse.timestamp
    });
  });

  // Handle typing indicator
  socket.on('typing', () => {
    socket.broadcast.emit('user_typing', socket.id);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log(`👋 User disconnected: ${socket.id}`);
    sessions.delete(socket.id);
  });
});

// REST API for analytics
app.get('/api/analytics/sessions', (req, res) => {
  res.json({
    activeSessions: sessions.size,
    sessions: Array.from(sessions.values()).map(s => ({
      id: s.id,
      startTime: s.startTime,
      messageCount: s.messages.length
    }))
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'AI Chatbot running!',
    activeSessions: sessions.size 
  });
});

// Serve static files for demo
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>AI Customer Support Chat</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Segoe UI', sans-serif; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); min-height: 100vh; display: flex; align-items: center; justify-content: center; }
        .chat-container { width: 400px; height: 600px; background: white; border-radius: 20px; box-shadow: 0 20px 60px rgba(0,0,0,0.3); display: flex; flex-direction: column; overflow: hidden; }
        .chat-header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; text-align: center; }
        .chat-header h2 { font-size: 18px; }
        .chat-header p { font-size: 12px; opacity: 0.8; }
        .chat-messages { flex: 1; overflow-y: auto; padding: 20px; }
        .message { margin-bottom: 15px; }
        .message.bot { text-align: left; }
        .message.user { text-align: right; }
        .message .bubble { display: inline-block; padding: 12px 18px; border-radius: 20px; max-width: 80%; }
        .message.bot .bubble { background: #f0f0f0; color: #333; border-bottom-left-radius: 5px; }
        .message.user .bubble { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-bottom-right-radius: 5px; }
        .suggestions { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 10px; }
        .suggestion { background: #e8e8e8; border: none; padding: 8px 12px; border-radius: 15px; cursor: pointer; font-size: 12px; }
        .suggestion:hover { background: #d0d0d0; }
        .chat-input { display: flex; padding: 15px; border-top: 1px solid #eee; }
        .chat-input input { flex: 1; border: 1px solid #ddd; border-radius: 25px; padding: 12px 20px; outline: none; }
        .chat-input button { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none; width: 45px; height: 45px; border-radius: 50%; margin-left: 10px; cursor: pointer; }
      </style>
    </head>
    <body>
      <div class="chat-container">
        <div class="chat-header">
          <h2>🤖 AI Support Assistant</h2>
          <p>Online • Typically replies instantly</p>
        </div>
        <div class="chat-messages" id="messages"></div>
        <div class="chat-input">
          <input type="text" id="input" placeholder="Type your message..." onkeypress="if(event.key==='Enter')sendMessage()">
          <button onclick="sendMessage()">➤</button>
        </div>
      </div>
      <script src="/socket.io/socket.io.js"></script>
      <script>
        const socket = io();
        const messagesDiv = document.getElementById('messages');
        const input = document.getElementById('input');

        socket.on('bot_message', (data) => {
          addMessage(data.message, 'bot', data.suggestions);
        });

        function addMessage(text, type, suggestions) {
          const div = document.createElement('div');
          div.className = 'message ' + type;
          div.innerHTML = '<div class="bubble">' + text + '</div>';
          
          if (suggestions && type === 'bot') {
            const suggestionsDiv = document.createElement('div');
            suggestionsDiv.className = 'suggestions';
            suggestions.forEach(s => {
              const btn = document.createElement('button');
              btn.className = 'suggestion';
              btn.textContent = s;
              btn.onclick = () => { input.value = s; sendMessage(); };
              suggestionsDiv.appendChild(btn);
            });
            div.appendChild(suggestionsDiv);
          }
          
          messagesDiv.appendChild(div);
          messagesDiv.scrollTop = messagesDiv.scrollHeight;
        }

        function sendMessage() {
          const message = input.value.trim();
          if (message) {
            addMessage(message, 'user');
            socket.emit('user_message', { message });
            input.value = '';
          }
        }
      </script>
    </body>
    </html>
  `);
});

server.listen(PORT, () => {
  console.log(`🤖 AI Chatbot Server running on port ${PORT}`);
  console.log(`💬 Open http://localhost:${PORT} to test the chatbot`);
});

