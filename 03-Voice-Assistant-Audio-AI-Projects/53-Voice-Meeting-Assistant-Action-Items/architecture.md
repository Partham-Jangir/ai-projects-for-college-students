# Architecture Document - Voice Meeting Assistant with Action Items

## 1. Overview

An AI-powered meeting assistant that records, transcribes meetings and automatically extracts action items, decisions, and key topics.

## 2. System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        Client Layer                              │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐  │
│  │  Meeting        │  │  Dashboard      │  │  Action Item    │  │
│  │  Recorder       │  │  (Meetings)     │  │  Manager        │  │
│  └────────┬────────┘  └────────┬────────┘  └────────┬────────┘  │
└───────────┼────────────────────┼────────────────────┼───────────┘
            │                    │                    │
            ▼                    ▼                    ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Express.js API Server                         │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │ Meeting API │ Transcript API │ Action Items API │ Export   │ │
│  └────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
            │
            ▼
┌─────────────────────────────────────────────────────────────────┐
│                   AI Meeting Analysis                            │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐  │
│  │ Transcription   │  │ Action Item     │  │ Decision        │  │
│  │ Engine          │  │ Extractor       │  │ Tracker         │  │
│  │ • Whisper       │  │ • NLP Parse     │  │ • Keywords      │  │
│  │ • Diarization   │  │ • Assignment    │  │ • Context       │  │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘  │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐  │
│  │ Topic           │  │ Summary         │  │ Follow-up       │  │
│  │ Detector        │  │ Generator       │  │ Scheduler       │  │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
            │
            ▼
┌─────────────────────────────────────────────────────────────────┐
│                       Data Layer                                 │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐  │
│  │  Audio Storage  │  │  MongoDB        │  │  Calendar       │  │
│  │  • Recordings   │  │  • Meetings     │  │  Integration    │  │
│  │                 │  │  • Actions      │  │  • Google/MS    │  │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

## 3. Technology Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| Backend | Node.js + Python | API & Processing |
| ASR | Whisper | Transcription |
| NLP | GPT / spaCy | Action Extraction |
| Storage | MongoDB + S3 | Data Storage |
| Calendar | Google/Outlook API | Integration |

## 4. Core Components

### 4.1 Meeting Recorder
- Audio capture
- Screen recording
- Integration with Zoom/Teams

### 4.2 Action Item Extractor
- Pattern recognition
- Assignment detection
- Due date extraction

### 4.3 Summary Generator
- Key decisions
- Discussion topics
- Attendee contributions

## 5. Features

| Feature | Description |
|---------|-------------|
| Record | Capture meeting audio |
| Transcribe | Real-time or post |
| Action Items | Auto-extract tasks |
| Decisions | Track key decisions |
| Export | Meeting minutes |

## 6. API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/meetings` | Create meeting |
| POST | `/api/meetings/:id/process` | Process recording |
| GET | `/api/meetings/:id/actions` | Get action items |
| GET | `/api/meetings/:id/summary` | Get summary |

## 7. Project Structure

```
53-Voice-Meeting-Assistant-Action-Items/
├── server.js                 # Main server
├── package.json              # Dependencies
├── routes/
│   ├── meetings.js          # Meeting routes
│   └── actions.js           # Action routes
├── services/
│   ├── recorder.js          # Audio recording
│   ├── transcriber.js       # Transcription
│   ├── actionExtractor.js   # NLP extraction
│   └── summaryGenerator.js  # Summary
└── models/
    ├── Meeting.js           # Meeting schema
    └── ActionItem.js        # Action schema
```

## 8. Development Tasks

- [ ] Set up server infrastructure
- [ ] Build meeting recorder
- [ ] Integrate transcription
- [ ] Create action item extractor
- [ ] Build decision tracker
- [ ] Generate meeting summaries
- [ ] Add calendar integration
- [ ] Create meeting dashboard
- [ ] Add export features
- [ ] Deploy application

## 9. Future Enhancements

- Real-time transcription
- Video conferencing integration
- Slack/Teams notifications
- Task management integration
- Sentiment analysis
- Meeting analytics

