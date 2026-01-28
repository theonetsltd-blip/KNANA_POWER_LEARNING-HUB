#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

// Chapter definitions for Level 2
const chapters = [
    {
        num: 2,
        title: "Advanced Excel & Data Analysis",
        title_sw: "Excel ya Kiwango Cha Juu na Uchambuzi wa Data",
        desc: "Master advanced spreadsheet functions, pivot tables, charts, and data visualization",
        desc_sw: "Jipatie ujuzi wa kazi za juu, jedwali la pivot, chati, na uwasilishaji wa data",
        duration: "8 hours",
        topics: [
            { en: "Advanced Formulas", sw: "Formulas za Kiwango Cha Juu", subtopics: ["VLOOKUP, INDEX-MATCH", "Conditional logic", "Array formulas"] },
            { en: "Pivot Tables", sw: "Jedwali la Pivot", subtopics: ["Create and customize pivot tables", "Slicers and filters", "Grouping and sorting"] },
            { en: "Data Analysis", sw: "Uchambuzi wa Data", subtopics: ["What-if analysis", "Goal Seek", "Scenario Manager", "Solver"] },
            { en: "Advanced Charts", sw: "Chati za Kiwango Cha Juu", subtopics: ["Combo charts", "Sparklines", "Dynamic charts", "Dashboard creation"] }
        ]
    },
    {
        num: 3,
        title: "PowerPoint Advanced Presentations",
        title_sw: "Wasilisho la Kiwango Cha Juu la PowerPoint",
        desc: "Create professional presentations with animations, multimedia, and interactive elements",
        desc_sw: "Tengeneza wasilisho wa kitaalamu na harakati, multimedia, na mamadondomi ya kujadiliana",
        duration: "7 hours",
        topics: [
            { en: "Animations & Transitions", sw: "Harakati na Mabadiliko", subtopics: ["Custom animations", "Timing and sequencing", "Slide transitions"] },
            { en: "Multimedia Integration", sw: "Ujumuishaji wa Multimedia", subtopics: ["Embed videos", "Insert audio", "Web content integration"] },
            { en: "Interactive Elements", sw: "Mamadondomi ya Kujadiliana", subtopics: ["Action buttons", "Hyperlinks", "Interactive quizzes"] },
            { en: "Design & Branding", sw: "Muundo na Alama", subtopics: ["Master slides", "Custom themes", "Consistency and style"] }
        ]
    },
    {
        num: 4,
        title: "Database Fundamentals with Access",
        title_sw: "Msingi wa Database na Access",
        desc: "Learn database design, creation, queries, and reporting with Microsoft Access",
        desc_sw: "Jifunze kubuni, kutengeneza, kuuliza, na kuripoti na Microsoft Access",
        duration: "8 hours",
        topics: [
            { en: "Database Design", sw: "Kubuni kwa Database", subtopics: ["Tables and fields", "Primary keys", "Relationships", "Normalization"] },
            { en: "Creating Tables", sw: "Kutengeneza Jedwali", subtopics: ["Field types", "Data validation", "Input masks", "Indexing"] },
            { en: "Queries & Filters", sw: "Swali na Kuchuja", subtopics: ["Select queries", "Action queries", "Complex criteria", "Sorting and grouping"] },
            { en: "Reports & Forms", sw: "Ripoti na Fomu", subtopics: ["Creating reports", "Grouping and totals", "Charts in reports", "Form design"] }
        ]
    }
];

function generateChapterHTML(chapter) {
    const topicsHTML = chapter.topics.map((topic, idx) => `
        <div style="background: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem; box-shadow: 0 4px 12px rgba(0,0,0,0.08);">
            <h4 style="color: #C2185B; margin-top: 0; margin-bottom: 1rem;">
                <span class="lang-en">${topic.en}</span>
                <span class="lang-sw" style="display: none;">${topic.sw}</span>
            </h4>
            <ul style="color: #555; line-height: 1.8; margin: 0;">
                ${topic.subtopics.map(st => `<li style="margin-bottom: 0.5rem;">${st}</li>`).join('')}
            </ul>
        </div>
    `).join('');

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>
        <span class="lang-en">Chapter ${chapter.num}: ${chapter.title}</span>
        <span class="lang-sw" style="display: none;">Sura ${chapter.num}: ${chapter.title_sw}</span>
    </title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="../assets/css/style.css">
    <link href="https://fonts.googleapis.com/css2?family=Segoe+UI:wght@400;500;600;700&display=swap" rel="stylesheet">
</head>
<body>

    <!-- Navbar -->
    <nav style="background: linear-gradient(135deg, #C2185B 0%, #7B1FA2 100%); padding: 1rem 0;">
        <div style="max-width: 1200px; margin: 0 auto; padding: 0 2rem; display: flex; justify-content: space-between; align-items: center;">
            <div style="font-size: 1.5rem; font-weight: 700; color: white;">KNANA POWER LEARNING HUB - Level 2</div>
            <div style="display: flex; gap: 1rem; align-items: center;">
                <a href="../chapters_level2.html" style="color: white; text-decoration: none; font-weight: 600;">← Back</a>
                <a href="../about.html" style="color: white; text-decoration: none; font-weight: 600;">About</a>
            </div>
        </div>
    </nav>

    <!-- Header -->
    <header style="background: linear-gradient(135deg, #C2185B 0%, #7B1FA2 50%, #512DA8 100%); color: white; padding: 4rem 0;">
        <div style="max-width: 1200px; margin: 0 auto; padding: 0 2rem;">
            <h1 style="margin: 0; font-size: 3rem;">
                <span class="lang-en">Chapter ${chapter.num}: ${chapter.title}</span>
                <span class="lang-sw" style="display: none;">Sura ${chapter.num}: ${chapter.title_sw}</span>
            </h1>
            <p style="font-size: 1.2rem; opacity: 0.9; margin-top: 1rem;">
                <span class="lang-en">${chapter.desc}</span>
                <span class="lang-sw" style="display: none;">${chapter.desc_sw}</span>
            </p>
            <p style="opacity: 0.8;">
                <span class="lang-en">Duration: ${chapter.duration}</span>
                <span class="lang-sw" style="display: none;">Muda: ${chapter.duration}</span>
            </p>
        </div>
    </header>

    <!-- Main Content -->
    <div style="max-width: 1200px; margin: 0 auto; padding: 3rem 2rem;">
        <h2 style="color: #C2185B; margin-bottom: 2rem;">
            <span class="lang-en">Topics Covered</span>
            <span class="lang-sw" style="display: none;">Mada Zinazolingana</span>
        </h2>
        ${topicsHTML}
    </div>

    <!-- Footer -->
    <footer style="background: #1F2937; color: white; padding: 3rem 0 1rem; margin-top: 4rem;">
        <div style="max-width: 1200px; margin: 0 auto; padding: 0 2rem; text-align: center;">
            <p style="opacity: 0.7; font-size: 0.9rem; margin: 0;">
                &copy; 2024-2026 KNANA POWER LEARNING HUB. Powered by <strong>The One Tech Services</strong>. All rights reserved.
            </p>
        </div>
    </footer>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>`;
}

// Create chapters
console.log('🔨 Generating Level 2 Chapters...');
const chaptersDir = path.join(__dirname, 'chapters_level2');

if (!fs.existsSync(chaptersDir)) {
    fs.mkdirSync(chaptersDir, { recursive: true });
    console.log('✓ Created chapters-level2 directory');
}

chapters.forEach(chapter => {
    const filePath = path.join(chaptersDir, `${chapter.num}.html`);
    const html = generateChapterHTML(chapter);
    fs.writeFileSync(filePath, html, 'utf-8');
    console.log(`✓ Generated chapter-${chapter.num}.html`);
});

console.log('✅ All Level 2 chapters generated successfully!');
