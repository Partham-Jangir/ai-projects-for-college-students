# 💼 AI-Enhanced Job Portal with Resume Matching

An intelligent job portal that uses AI to match candidates with job opportunities based on skills, experience, and requirements.

## 🎯 Features

- **Smart Resume Parsing**: Extract skills and experience from resume text
- **AI Job Matching**: Score and rank job matches for candidates
- **Candidate Matching**: Find best candidates for job openings
- **Skill Analysis**: Identify matching and missing skills
- **Skill Suggestions**: Autocomplete for skill input
- **Match Scoring**: Weighted scoring based on skills and experience

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **AI Engine**: Custom matching algorithms
- **Optional**: PDF parsing, OpenAI for advanced analysis

## 📦 Installation

```bash
npm install
npm run dev
```

## 🔗 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/jobs` | Get all job listings |
| GET | `/api/jobs/:id` | Get single job |
| POST | `/api/match/jobs` | Submit resume, get job matches |
| GET | `/api/match/candidates/:jobId` | Find candidates for a job |
| GET | `/api/skills/suggest?query=X` | Get skill suggestions |

## 🧠 Matching Algorithm

The AI matching engine considers:

1. **Skill Match (70%)**: Compares candidate skills with job requirements
2. **Experience Match (30%)**: Validates years of experience
3. **Skill Normalization**: Handles synonyms (js = javascript)

### Match Levels
- 🟢 **Strong Match**: 70%+ compatibility
- 🟡 **Good Match**: 50-69% compatibility
- 🟠 **Potential Match**: Below 50%

## 📊 Example Usage

```javascript
// Submit resume for matching
fetch('/api/match/jobs', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    skills: ['javascript', 'react', 'nodejs'],
    experience: 3
  })
})
.then(res => res.json())
.then(data => console.log(data.matches));
```

## 📝 License

MIT License - Team Akrix

