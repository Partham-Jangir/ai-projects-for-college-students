$root = "g:\ai-projects-students\Antigravity-Ai-Projects"

# 01-Web-Application-Projects
$cat1 = Join-Path $root "01-Web-Application-Projects"
$projects1 = @(
    "01-AI-Ecommerce-Recommendation-Engine",
    "02-Smart-Blog-Platform-AI-Suggestions",
    "03-Realtime-AI-Chatbot-Customer-Support",
    "04-AI-Job-Portal-Resume-Matching",
    "05-Intelligent-LMS-Progress-Tracking",
    "06-AI-News-Aggregator-Personalized-Feed",
    "07-Smart-Restaurant-Menu-Recommendations",
    "08-AI-Real-Estate-Property-Matching",
    "09-Intelligent-Travel-Booking-Trip-Planning",
    "10-AI-Social-Media-Sentiment-Dashboard",
    "11-Smart-Finance-Dashboard-Insights",
    "12-AI-Healthcare-Portal-Symptom-Checker",
    "13-Intelligent-Event-Management-Scheduling",
    "14-AI-Marketplace-Fraud-Detection",
    "15-Smart-CMS-Auto-Tagging",
    "16-AI-Photography-Portfolio-Enhancement",
    "17-Intelligent-Recipe-Meal-Planning",
    "18-Smart-Fitness-Workout-Recommendations",
    "19-AI-Dating-Compatibility-Matching",
    "20-Intelligent-Stock-Trading-Predictions",
    "21-Smart-Home-Automation-AI-Interface",
    "22-AI-Online-Education-Adaptive-Learning",
    "23-Intelligent-Weather-Predictive-Analytics",
    "24-Smart-Parking-Space-Optimization",
    "25-AI-Gaming-Player-Behavior-Analysis"
)

# 02-Mobile-Application-Projects
$cat2 = Join-Path $root "02-Mobile-Application-Projects"
$projects2 = @(
    "26-AI-Personal-Assistant-Voice-Commands",
    "27-Smart-Shopping-Visual-Product-Search",
    "28-AI-Fitness-Tracker-Form-Correction",
    "29-Intelligent-Language-Learning-Pronunciation",
    "30-Smart-Camera-Object-Recognition-AR",
    "31-AI-Music-Streaming-Mood-Detection",
    "32-Intelligent-Navigation-Traffic-Prediction",
    "33-Smart-Health-Monitoring-Symptom-Analysis",
    "34-AI-Dating-Personality-Matching",
    "35-Intelligent-Study-Companion-Quiz-Generation",
    "36-Smart-Expense-Tracker-Receipt-Scanning",
    "37-AI-Photo-Editor-Auto-Enhancement",
    "38-Intelligent-Meditation-Mood-Recommendations",
    "39-Smart-Plant-Care-Disease-Detection",
    "40-AI-News-Reader-Personalized-Summaries",
    "41-Intelligent-Password-Manager-Security",
    "42-Smart-Cooking-Assistant-Recipe-Recognition",
    "43-AI-Social-Media-Content-Moderation",
    "44-Intelligent-Sleep-Tracker-Pattern-Analysis",
    "45-Smart-Travel-Companion-Local-Recommendations",
    "46-AI-Gaming-Dynamic-Difficulty",
    "47-Intelligent-Document-Scanner-Text-Extraction",
    "48-Smart-Parenting-Child-Development",
    "49-AI-Video-Calling-Noise-Reduction",
    "50-Intelligent-Pet-Care-Health-Monitoring"
)

# 03-Voice-Assistant-Audio-AI-Projects
$cat3 = Join-Path $root "03-Voice-Assistant-Audio-AI-Projects"
$projects3 = @(
    "51-Custom-Voice-Assistant-Smart-Home",
    "52-AI-Podcast-Transcription-Summarization",
    "53-Voice-Meeting-Assistant-Action-Items",
    "54-Intelligent-Audio-Book-Reader",
    "55-Smart-Voice-Translator-Realtime",
    "56-AI-Voice-Recorder-Meeting-Notes",
    "57-Voice-Inventory-Management-System",
    "58-Intelligent-Call-Center-Sentiment",
    "59-Smart-Voice-Shopping-Ecommerce",
    "60-AI-Voice-Cloning-Application",
    "61-Voice-Smart-Car-Interface",
    "62-Intelligent-Audio-Content-Synthesis",
    "63-Smart-Voice-Password-Manager",
    "64-AI-Voice-Mail-Transcription",
    "65-Voice-Gaming-Interface-Commands",
    "66-Intelligent-Audio-Editing-Enhancement",
    "67-Smart-Voice-Reminder-Context-Aware",
    "68-AI-Voice-Emotion-Recognition",
    "69-Voice-Smart-TV-Interface",
    "70-Intelligent-Audio-Journaling-Mood"
)

# 04-AI-Agent-Automation-Projects
$cat4 = Join-Path $root "04-AI-Agent-Automation-Projects"
$projects4 = @(
    "71-Intelligent-Email-Management-Auto-Sorting",
    "72-Smart-Social-Media-Marketing-Scheduling",
    "73-AI-Research-Assistant-Academic-Papers",
    "74-Intelligent-Customer-Service-Multi-Platform",
    "75-Smart-Content-Creation-Blog-Writing",
    "76-AI-Personal-Finance-Investment-Advice",
    "77-Intelligent-Project-Management-Task-Automation",
    "78-Smart-Travel-Planning-Itinerary-Generation",
    "79-AI-Sales-Lead-Generation-Agent",
    "80-Intelligent-Code-Review-Dev-Teams",
    "81-Smart-Health-Monitoring-Alert-System",
    "82-AI-Learning-Progress-Agent-Students",
    "83-Intelligent-Data-Analysis-Business-Insights",
    "84-Smart-Inventory-Management-Retail",
    "85-AI-Content-Moderation-Platforms"
)

# 05-Cross-Platform-Emerging-Tech-Projects
$cat5 = Join-Path $root "05-Cross-Platform-Emerging-Tech-Projects"
$projects5 = @(
    "86-AI-Progressive-Web-App-Multi-Device",
    "87-Smart-IoT-Dashboard-Predictive-Maintenance",
    "88-AI-Augmented-Reality-Shopping",
    "89-Intelligent-Blockchain-Voting-System",
    "90-Smart-Drone-Control-AI-Navigation",
    "91-AI-Virtual-Reality-Training-Platform",
    "92-Intelligent-Edge-Computing-Smart-Cities",
    "93-Smart-Wearable-Integration-Health-AI",
    "94-AI-Cryptocurrency-Trading-Bot",
    "95-Intelligent-3D-Printing-Optimization",
    "96-Smart-Agricultural-Drone-Monitoring",
    "97-AI-Accessibility-Tools-Disabled-Users",
    "98-Intelligent-Supply-Chain-Management",
    "99-Smart-Energy-Management-AI-Optimization",
    "100-AI-Cybersecurity-Threat-Detection"
)

$all_cats = @(
    @{cat=$cat1; projs=$projects1},
    @{cat=$cat2; projs=$projects2},
    @{cat=$cat3; projs=$projects3},
    @{cat=$cat4; projs=$projects4},
    @{cat=$cat5; projs=$projects5}
)

foreach ($item in $all_cats) {
    $categoryPath = $item.cat
    if (!(Test-Path $categoryPath)) {
        New-Item -ItemType Directory -Force -Path $categoryPath | Out-Null
        Write-Host "Created category: $categoryPath"
    }
    
    foreach ($proj in $item.projs) {
        $projPath = Join-Path $categoryPath $proj
        if (!(Test-Path $projPath)) {
            New-Item -ItemType Directory -Force -Path $projPath | Out-Null
            Write-Host "Created project: $proj"
        }
    }
}
