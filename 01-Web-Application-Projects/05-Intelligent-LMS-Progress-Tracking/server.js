const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5004;

app.use(cors());
app.use(express.json());

// Sample courses and students
const courses = [
  { id: 1, title: "Introduction to Python", modules: 10, category: "Programming" },
  { id: 2, title: "Machine Learning Basics", modules: 12, category: "AI/ML" },
  { id: 3, title: "Web Development with React", modules: 8, category: "Web Dev" },
  { id: 4, title: "Data Structures", modules: 15, category: "Programming" }
];

const studentProgress = {};

// AI Learning Analytics Engine
class LearningAnalytics {
  // Analyze student learning pattern
  analyzePattern(progress) {
    const completedModules = progress.filter(p => p.completed).length;
    const totalTime = progress.reduce((sum, p) => sum + (p.timeSpent || 0), 0);
    const avgTime = totalTime / (completedModules || 1);

    let learningStyle = "Steady";
    if (avgTime < 15) learningStyle = "Fast Learner";
    else if (avgTime > 45) learningStyle = "Deep Learner";

    return {
      completedModules,
      totalTime,
      avgTimePerModule: Math.round(avgTime),
      learningStyle,
      completionRate: Math.round((completedModules / progress.length) * 100)
    };
  }

  // Generate personalized recommendations
  getRecommendations(studentId, currentCourseId) {
    const progress = studentProgress[studentId] || [];
    const analytics = this.analyzePattern(progress);
    
    const recommendations = [];
    
    if (analytics.completionRate < 50) {
      recommendations.push({ type: "motivation", message: "You're doing great! Keep going to complete this course." });
    }
    
    if (analytics.learningStyle === "Fast Learner") {
      recommendations.push({ type: "challenge", message: "Try the advanced exercises for extra challenge!" });
    }

    // Suggest next courses
    const completedCategories = new Set(progress.filter(p => p.completed).map(p => p.category));
    const suggestedCourses = courses.filter(c => 
      c.id !== currentCourseId && !completedCategories.has(c.category)
    ).slice(0, 3);

    return { analytics, recommendations, suggestedCourses };
  }

  // Predict completion time
  predictCompletion(studentId, courseId) {
    const progress = studentProgress[studentId] || [];
    if (progress.length === 0) return { estimatedDays: 14, confidence: "low" };

    const analytics = this.analyzePattern(progress);
    const course = courses.find(c => c.id === courseId);
    const remainingModules = course.modules - analytics.completedModules;
    const estimatedMinutes = remainingModules * analytics.avgTimePerModule;
    const estimatedDays = Math.ceil(estimatedMinutes / 60); // Assuming 1 hour per day

    return {
      estimatedDays,
      remainingModules,
      estimatedMinutes,
      confidence: progress.length > 3 ? "high" : "medium"
    };
  }
}

const analytics = new LearningAnalytics();

// API Routes
app.get('/api/courses', (req, res) => {
  res.json({ success: true, courses });
});

app.post('/api/progress/update', (req, res) => {
  const { studentId, courseId, moduleId, completed, timeSpent } = req.body;
  
  if (!studentProgress[studentId]) studentProgress[studentId] = [];
  
  studentProgress[studentId].push({
    courseId, moduleId, completed, timeSpent, timestamp: new Date()
  });

  res.json({ success: true, message: "Progress updated" });
});

app.get('/api/analytics/:studentId', (req, res) => {
  const { studentId } = req.params;
  const { courseId } = req.query;
  
  const recommendations = analytics.getRecommendations(studentId, parseInt(courseId));
  const prediction = analytics.predictCompletion(studentId, parseInt(courseId));

  res.json({ success: true, ...recommendations, prediction });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Intelligent LMS running!' });
});

app.listen(PORT, () => {
  console.log(`📚 Intelligent LMS running on port ${PORT}`);
});

