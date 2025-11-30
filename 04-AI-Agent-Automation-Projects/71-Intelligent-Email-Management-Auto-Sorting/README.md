# 📧 Intelligent Email Management Agent with Auto-Sorting

An AI-powered email agent that automatically categorizes, prioritizes, and manages your inbox.

## 🎯 Features

- **Auto-Categorization**: AI classifies emails (Work, Newsletter, Support, Promotions)
- **Priority Detection**: Identifies urgent emails automatically
- **Smart Replies**: Generates contextual reply suggestions
- **Sentiment Analysis**: Detects email tone and urgency
- **Inbox Summary**: Dashboard with email statistics
- **Auto-Responses**: Configurable automated replies

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **AI Engine**: Custom NLP classification
- **Optional**: OpenAI GPT for advanced processing

## 📦 Installation

```bash
npm install
npm run dev
```

## 🔗 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/emails` | Get all processed emails |
| GET | `/api/emails/summary` | Get inbox statistics |
| GET | `/api/emails/category/:cat` | Filter by category |
| GET | `/api/emails/priority/:pri` | Filter by priority |
| GET | `/api/emails/:id/suggestions` | Get reply suggestions |
| POST | `/api/emails` | Add new email |

## 🧠 AI Classification

### Categories
- 📁 **Work**: Business communications
- 📰 **Newsletter**: Subscriptions and digests
- 🎧 **Support**: Tickets and help requests
- 🏷️ **Promotions**: Sales and marketing
- 💬 **Social**: Social network notifications
- 💳 **Finance**: Banking and payments

### Priority Levels
- 🔴 **High**: Urgent, ASAP, deadline
- 🟡 **Medium**: Follow up, review
- 🟢 **Low**: FYI, newsletters

## 📝 License

MIT License - Team Akrix

