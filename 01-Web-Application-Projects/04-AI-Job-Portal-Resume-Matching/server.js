const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5003;

app.use(cors());
app.use(express.json());

// Sample job listings
const jobs = [
  {
    id: 1,
    title: "Senior Full Stack Developer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$120,000 - $160,000",
    requirements: ["JavaScript", "React", "Node.js", "MongoDB", "5+ years experience"],
    skills: ["javascript", "react", "nodejs", "mongodb", "typescript", "aws"],
    description: "Looking for an experienced full-stack developer to lead our frontend team."
  },
  {
    id: 2,
    title: "Machine Learning Engineer",
    company: "AI Solutions",
    location: "Remote",
    type: "Full-time",
    salary: "$140,000 - $180,000",
    requirements: ["Python", "TensorFlow", "PyTorch", "ML/AI", "3+ years experience"],
    skills: ["python", "tensorflow", "pytorch", "machine learning", "deep learning", "nlp"],
    description: "Join our AI team to build cutting-edge ML models."
  },
  {
    id: 3,
    title: "Frontend Developer",
    company: "StartupXYZ",
    location: "New York, NY",
    type: "Full-time",
    salary: "$90,000 - $120,000",
    requirements: ["React", "TypeScript", "CSS", "2+ years experience"],
    skills: ["react", "typescript", "css", "html", "javascript", "figma"],
    description: "Build beautiful user interfaces for our SaaS platform."
  },
  {
    id: 4,
    title: "DevOps Engineer",
    company: "CloudTech",
    location: "Seattle, WA",
    type: "Full-time",
    salary: "$110,000 - $150,000",
    requirements: ["AWS", "Docker", "Kubernetes", "CI/CD", "3+ years experience"],
    skills: ["aws", "docker", "kubernetes", "terraform", "jenkins", "linux"],
    description: "Manage and optimize our cloud infrastructure."
  },
  {
    id: 5,
    title: "Data Scientist",
    company: "DataDriven",
    location: "Boston, MA",
    type: "Full-time",
    salary: "$100,000 - $140,000",
    requirements: ["Python", "SQL", "Statistics", "Machine Learning", "2+ years"],
    skills: ["python", "sql", "pandas", "scikit-learn", "statistics", "visualization"],
    description: "Analyze data and build predictive models for business insights."
  }
];

// Sample resumes (in production, these would be uploaded and parsed)
const resumes = [];

// AI Resume Matching Engine
class ResumeMatchingEngine {
  constructor() {
    this.skillSynonyms = {
      "js": "javascript",
      "node": "nodejs",
      "react.js": "react",
      "vue.js": "vue",
      "angular.js": "angular",
      "py": "python",
      "tf": "tensorflow",
      "k8s": "kubernetes",
      "ml": "machine learning",
      "ai": "artificial intelligence",
      "dl": "deep learning"
    };
  }

  // Normalize skills
  normalizeSkill(skill) {
    const lower = skill.toLowerCase().trim();
    return this.skillSynonyms[lower] || lower;
  }

  // Calculate match score between resume and job
  calculateMatchScore(resumeSkills, jobSkills, resumeExperience, requiredExperience) {
    const normalizedResumeSkills = resumeSkills.map(s => this.normalizeSkill(s));
    const normalizedJobSkills = jobSkills.map(s => this.normalizeSkill(s));

    // Skill matching
    const matchingSkills = normalizedResumeSkills.filter(s => 
      normalizedJobSkills.includes(s)
    );

    const skillScore = (matchingSkills.length / normalizedJobSkills.length) * 100;

    // Experience score
    let experienceScore = 100;
    if (requiredExperience && resumeExperience < requiredExperience) {
      experienceScore = (resumeExperience / requiredExperience) * 100;
    }

    // Combined score (70% skills, 30% experience)
    const totalScore = (skillScore * 0.7) + (experienceScore * 0.3);

    return {
      totalScore: Math.round(totalScore),
      skillScore: Math.round(skillScore),
      experienceScore: Math.round(experienceScore),
      matchingSkills,
      missingSkills: normalizedJobSkills.filter(s => !normalizedResumeSkills.includes(s))
    };
  }

  // Find best job matches for a resume
  findJobMatches(resumeData) {
    const matches = jobs.map(job => {
      const requiredExp = this.extractExperience(job.requirements);
      const score = this.calculateMatchScore(
        resumeData.skills,
        job.skills,
        resumeData.experience,
        requiredExp
      );

      return {
        job,
        matchScore: score.totalScore,
        details: score
      };
    });

    return matches.sort((a, b) => b.matchScore - a.matchScore);
  }

  // Find best candidates for a job
  findCandidates(jobId) {
    const job = jobs.find(j => j.id === jobId);
    if (!job || resumes.length === 0) return [];

    const requiredExp = this.extractExperience(job.requirements);
    
    const candidates = resumes.map(resume => {
      const score = this.calculateMatchScore(
        resume.skills,
        job.skills,
        resume.experience,
        requiredExp
      );

      return {
        resume,
        matchScore: score.totalScore,
        details: score
      };
    });

    return candidates.sort((a, b) => b.matchScore - a.matchScore);
  }

  // Extract years of experience from requirements
  extractExperience(requirements) {
    for (const req of requirements) {
      const match = req.match(/(\d+)\+?\s*years?/i);
      if (match) return parseInt(match[1]);
    }
    return 0;
  }

  // Parse resume text (simplified)
  parseResume(text) {
    const commonSkills = [
      "javascript", "python", "java", "react", "nodejs", "mongodb", 
      "sql", "aws", "docker", "kubernetes", "typescript", "vue",
      "angular", "tensorflow", "pytorch", "machine learning", "html", "css"
    ];

    const lowerText = text.toLowerCase();
    const foundSkills = commonSkills.filter(skill => lowerText.includes(skill));

    // Extract experience (simplified)
    const expMatch = lowerText.match(/(\d+)\+?\s*years?\s*(of\s*)?(experience|exp)/i);
    const experience = expMatch ? parseInt(expMatch[1]) : 0;

    return {
      skills: foundSkills,
      experience
    };
  }
}

const matchingEngine = new ResumeMatchingEngine();

// API Routes

// Get all jobs
app.get('/api/jobs', (req, res) => {
  res.json({ success: true, jobs });
});

// Get single job
app.get('/api/jobs/:id', (req, res) => {
  const job = jobs.find(j => j.id === parseInt(req.params.id));
  if (!job) return res.status(404).json({ success: false, message: 'Job not found' });
  res.json({ success: true, job });
});

// Submit resume and get job matches
app.post('/api/match/jobs', (req, res) => {
  const { skills, experience, resumeText } = req.body;

  let resumeData;
  if (resumeText) {
    resumeData = matchingEngine.parseResume(resumeText);
  } else {
    resumeData = { skills: skills || [], experience: experience || 0 };
  }

  // Store resume
  const resumeId = resumes.length + 1;
  resumes.push({ id: resumeId, ...resumeData, submittedAt: new Date() });

  // Find matches
  const matches = matchingEngine.findJobMatches(resumeData);

  res.json({
    success: true,
    resumeId,
    parsedData: resumeData,
    matches: matches.map(m => ({
      job: m.job,
      matchScore: m.matchScore,
      matchingSkills: m.details.matchingSkills,
      missingSkills: m.details.missingSkills,
      recommendation: m.matchScore >= 70 ? "Strong Match" : 
                       m.matchScore >= 50 ? "Good Match" : "Potential Match"
    }))
  });
});

// Find candidates for a job
app.get('/api/match/candidates/:jobId', (req, res) => {
  const jobId = parseInt(req.params.jobId);
  const candidates = matchingEngine.findCandidates(jobId);

  res.json({
    success: true,
    candidates: candidates.map(c => ({
      resume: c.resume,
      matchScore: c.matchScore,
      matchingSkills: c.details.matchingSkills
    }))
  });
});

// Skills suggestion (autocomplete)
app.get('/api/skills/suggest', (req, res) => {
  const { query } = req.query;
  const allSkills = [
    "JavaScript", "Python", "Java", "React", "Node.js", "MongoDB",
    "SQL", "AWS", "Docker", "Kubernetes", "TypeScript", "Vue.js",
    "Angular", "TensorFlow", "PyTorch", "Machine Learning", "Deep Learning",
    "HTML", "CSS", "Git", "Linux", "PostgreSQL", "Redis", "GraphQL"
  ];

  const suggestions = query 
    ? allSkills.filter(s => s.toLowerCase().includes(query.toLowerCase()))
    : allSkills;

  res.json({ success: true, suggestions });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'AI Job Portal running!',
    stats: { jobs: jobs.length, resumes: resumes.length }
  });
});

app.listen(PORT, () => {
  console.log(`💼 AI Job Portal running on port ${PORT}`);
  console.log(`🤖 Resume Matching Engine initialized with ${jobs.length} jobs`);
});

