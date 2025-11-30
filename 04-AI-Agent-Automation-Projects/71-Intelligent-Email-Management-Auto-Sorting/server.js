const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5071;

app.use(cors());
app.use(express.json());

// Sample emails database
let emails = [
  { id: 1, from: 'boss@company.com', subject: 'Q4 Budget Review', body: 'Please review the attached budget...', timestamp: new Date(), category: null, priority: null },
  { id: 2, from: 'newsletter@medium.com', subject: 'Your weekly digest', body: 'Top stories this week...', timestamp: new Date(), category: null, priority: null },
  { id: 3, from: 'support@service.com', subject: 'Your ticket #12345', body: 'Your support ticket has been resolved...', timestamp: new Date(), category: null, priority: null },
  { id: 4, from: 'promo@store.com', subject: '50% OFF SALE!', body: 'Limited time offer...', timestamp: new Date(), category: null, priority: null },
  { id: 5, from: 'hr@company.com', subject: 'Urgent: Policy Update', body: 'Please acknowledge the new policy...', timestamp: new Date(), category: null, priority: null },
];

// AI Email Management Agent
class EmailAgent {
  constructor() {
    // Email classification rules
    this.categoryPatterns = {
      'Work': ['boss', 'company', 'project', 'meeting', 'deadline', 'report', 'budget'],
      'Newsletter': ['newsletter', 'digest', 'weekly', 'subscribe', 'unsubscribe'],
      'Support': ['support', 'ticket', 'help', 'issue', 'resolved', 'case'],
      'Promotions': ['sale', 'discount', 'offer', 'promo', '%off', 'deal', 'coupon'],
      'Social': ['friend', 'linkedin', 'facebook', 'twitter', 'invitation'],
      'Finance': ['invoice', 'payment', 'bank', 'statement', 'transaction'],
    };

    this.priorityKeywords = {
      high: ['urgent', 'asap', 'important', 'critical', 'deadline', 'immediately'],
      medium: ['follow up', 'review', 'reminder', 'action required'],
      low: ['fyi', 'newsletter', 'digest', 'promotional', 'sale']
    };

    this.autoResponses = {
      'Support': "Thank you for reaching out. I'll review this support ticket and get back to you shortly.",
      'Promotions': null, // No auto-response
      'Newsletter': null,
    };
  }

  // Classify email category
  classifyCategory(email) {
    const text = `${email.from} ${email.subject} ${email.body}`.toLowerCase();
    
    for (const [category, patterns] of Object.entries(this.categoryPatterns)) {
      if (patterns.some(pattern => text.includes(pattern))) {
        return category;
      }
    }
    return 'General';
  }

  // Determine priority
  determinePriority(email) {
    const text = `${email.subject} ${email.body}`.toLowerCase();
    
    if (this.priorityKeywords.high.some(k => text.includes(k))) return 'high';
    if (this.priorityKeywords.medium.some(k => text.includes(k))) return 'medium';
    return 'low';
  }

  // Process single email
  processEmail(email) {
    const category = this.classifyCategory(email);
    const priority = this.determinePriority(email);
    const autoResponse = this.autoResponses[category];
    const sentiment = this.analyzeSentiment(email.body);

    return {
      ...email,
      category,
      priority,
      autoResponse,
      sentiment,
      processedAt: new Date()
    };
  }

  // Simple sentiment analysis
  analyzeSentiment(text) {
    const positiveWords = ['thank', 'great', 'excellent', 'happy', 'resolved', 'appreciate'];
    const negativeWords = ['problem', 'issue', 'frustrated', 'angry', 'disappointed', 'urgent'];
    
    const lower = text.toLowerCase();
    const positiveScore = positiveWords.filter(w => lower.includes(w)).length;
    const negativeScore = negativeWords.filter(w => lower.includes(w)).length;

    if (positiveScore > negativeScore) return 'positive';
    if (negativeScore > positiveScore) return 'negative';
    return 'neutral';
  }

  // Generate smart reply suggestions
  generateReplySuggestions(email) {
    const templates = {
      Work: [
        "I'll review this and get back to you by end of day.",
        "Thank you for the update. I'll take action on this.",
        "Let's schedule a call to discuss this further."
      ],
      Support: [
        "Thank you for resolving this issue.",
        "I need more information to proceed.",
        "Can you please escalate this to your supervisor?"
      ],
      General: [
        "Thank you for your email.",
        "I'll respond in detail shortly.",
        "Let me look into this and get back to you."
      ]
    };

    return templates[email.category] || templates.General;
  }

  // Process all emails in inbox
  processInbox(emails) {
    return emails.map(email => this.processEmail(email));
  }

  // Get inbox summary
  getInboxSummary(emails) {
    const processed = this.processInbox(emails);
    
    const categoryCounts = {};
    const priorityCounts = { high: 0, medium: 0, low: 0 };

    processed.forEach(email => {
      categoryCounts[email.category] = (categoryCounts[email.category] || 0) + 1;
      priorityCounts[email.priority]++;
    });

    return {
      total: emails.length,
      byCategory: categoryCounts,
      byPriority: priorityCounts,
      needsAttention: processed.filter(e => e.priority === 'high').length
    };
  }
}

const agent = new EmailAgent();

// API Routes

// Get all emails (processed)
app.get('/api/emails', (req, res) => {
  const processed = agent.processInbox(emails);
  res.json({ success: true, emails: processed });
});

// Get inbox summary
app.get('/api/emails/summary', (req, res) => {
  const summary = agent.getInboxSummary(emails);
  res.json({ success: true, summary });
});

// Get emails by category
app.get('/api/emails/category/:category', (req, res) => {
  const { category } = req.params;
  const processed = agent.processInbox(emails).filter(e => e.category === category);
  res.json({ success: true, emails: processed });
});

// Get emails by priority
app.get('/api/emails/priority/:priority', (req, res) => {
  const { priority } = req.params;
  const processed = agent.processInbox(emails).filter(e => e.priority === priority);
  res.json({ success: true, emails: processed });
});

// Get smart reply suggestions
app.get('/api/emails/:id/suggestions', (req, res) => {
  const email = emails.find(e => e.id === parseInt(req.params.id));
  if (!email) return res.status(404).json({ success: false, message: 'Email not found' });
  
  const processed = agent.processEmail(email);
  const suggestions = agent.generateReplySuggestions(processed);
  res.json({ success: true, suggestions });
});

// Add new email (simulate incoming)
app.post('/api/emails', (req, res) => {
  const { from, subject, body } = req.body;
  const newEmail = {
    id: emails.length + 1,
    from,
    subject,
    body,
    timestamp: new Date(),
    category: null,
    priority: null
  };
  emails.push(newEmail);
  const processed = agent.processEmail(newEmail);
  res.json({ success: true, email: processed });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Email Management Agent running!' });
});

app.listen(PORT, () => {
  console.log(`📧 Email Management Agent running on port ${PORT}`);
  console.log(`🤖 AI email processing enabled`);
});

