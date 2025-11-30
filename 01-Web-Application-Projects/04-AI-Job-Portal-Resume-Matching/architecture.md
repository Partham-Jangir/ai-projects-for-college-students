# Architecture Document - AI Job Portal with Resume Matching

## 1. Overview

An intelligent job portal that uses AI to match candidates with job opportunities based on skills, experience, and requirements using advanced matching algorithms.

## 2. System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        Client Layer                              │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐  │
│  │  Job Seeker     │  │  Recruiter      │  │  Admin          │  │
│  │  Portal         │  │  Dashboard      │  │  Panel          │  │
│  └────────┬────────┘  └────────┬────────┘  └────────┬────────┘  │
└───────────┼────────────────────┼────────────────────┼───────────┘
            │                    │                    │
            ▼                    ▼                    ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Express.js API Server                         │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │  Jobs API  │  Candidates API  │  Matching API              │ │
│  └────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
            │
            ▼
┌─────────────────────────────────────────────────────────────────┐
│                   AI Matching Engine                             │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐  │
│  │ Resume Parser   │  │ Skill Matcher   │  │ Experience      │  │
│  │ • Text Extract  │  │ • Skill Score   │  │ Validator       │  │
│  │ • Entity NER    │  │ • Synonym Map   │  │ • Years Match   │  │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘  │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐  │
│  │ Ranking Engine  │  │ Gap Analyzer    │  │ Recommendation  │  │
│  │ • Score Calc    │  │ • Missing Skills│  │ Engine          │  │
│  │ • Weighted Sum  │  │ • Suggestions   │  │                 │  │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
            │
            ▼
┌─────────────────────────────────────────────────────────────────┐
│                       Data Layer                                 │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐  │
│  │  MongoDB        │  │  Elasticsearch  │  │  Skills DB      │  │
│  │  • Jobs         │  │  • Job Search   │  │  • Synonyms     │  │
│  │  • Candidates   │  │  • Full-text    │  │  • Categories   │  │
│  │  • Applications │  │                 │  │                 │  │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

## 3. Technology Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| Backend | Node.js, Express.js | REST API Server |
| Frontend | React.js | User Interface |
| Database | MongoDB | Data Storage |
| Search | Elasticsearch | Job Search |
| AI/ML | Custom Algorithms | Matching Engine |
| PDF | pdf-parse | Resume Parsing |

## 4. Core Components

### 4.1 Resume Parser
- PDF/DOCX text extraction
- Named Entity Recognition (NER)
- Skill identification
- Experience extraction

### 4.2 Skill Matcher
- Skill normalization (js = javascript)
- Synonym mapping
- Category matching
- Weighted scoring (70% skills, 30% experience)

### 4.3 Ranking Engine
- Match score calculation
- Strong Match: 70%+ compatibility
- Good Match: 50-69% compatibility
- Potential Match: Below 50%

## 5. Data Flow

```
Resume Upload → Parse Text → Extract Skills → Calculate Match
                                                     │
                                                     ▼
                                   ┌─────────────────────────────┐
                                   │     Matching Algorithm       │
                                   │ 1. Normalize skills          │
                                   │ 2. Compare with requirements │
                                   │ 3. Calculate skill score     │
                                   │ 4. Validate experience       │
                                   │ 5. Generate final score      │
                                   │ 6. Identify skill gaps       │
                                   └─────────────────────────────┘
                                                     │
                                                     ▼
                                         Return Ranked Matches
```

## 6. API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/jobs` | Get all job listings |
| GET | `/api/jobs/:id` | Get single job |
| POST | `/api/match/jobs` | Submit resume, get job matches |
| GET | `/api/match/candidates/:jobId` | Find candidates for a job |
| GET | `/api/skills/suggest?query=X` | Get skill suggestions |

## 7. Project Structure

```
04-AI-Job-Portal-Resume-Matching/
├── server.js                 # Main server
├── package.json              # Dependencies
├── routes/
│   ├── jobs.js              # Job listings
│   ├── candidates.js        # Candidate routes
│   └── matching.js          # Matching routes
├── services/
│   ├── resumeParser.js      # Resume text extraction
│   ├── skillMatcher.js      # Skill matching logic
│   ├── experienceValidator.js # Experience validation
│   └── rankingEngine.js     # Score calculation
├── data/
│   ├── skills.json          # Skills database
│   └── synonyms.json        # Skill synonyms
├── models/
│   ├── Job.js               # Job schema
│   └── Candidate.js         # Candidate schema
└── utils/
    └── pdfParser.js         # PDF processing
```

## 8. Development Tasks

- [ ] Set up Express.js server
- [ ] Create job listing CRUD
- [ ] Build resume parser service
- [ ] Implement skill matching algorithm
- [ ] Develop synonym normalization
- [ ] Create experience validator
- [ ] Build ranking engine
- [ ] Add skill suggestion API
- [ ] Create job seeker frontend
- [ ] Build recruiter dashboard
- [ ] Add application tracking
- [ ] Deploy application

## 9. Future Enhancements

- AI-powered interview scheduling
- Video interview integration
- Advanced NLP resume analysis
- Salary prediction
- Career path recommendations
- Company culture matching

