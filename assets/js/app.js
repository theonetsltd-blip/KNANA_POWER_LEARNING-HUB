// =====================================================
// JIFUNZE COMPUTER KWA URAHISI - BILINGUAL SYSTEM
// =====================================================

class BilingualSystem {
    constructor() {
        this.defaultLang = 'en';
        this.currentLang = this.getStoredLanguage() || this.defaultLang;
        this.translations = {};
        this.init();
    }

    init() {
        this.setupLanguageToggle();
        this.applyLanguage(this.currentLang);
        this.setupPageTranslations();
    }

    getStoredLanguage() {
        return localStorage.getItem('selectedLanguage');
    }

    setStoredLanguage(lang) {
        localStorage.setItem('selectedLanguage', lang);
    }

    setupLanguageToggle() {
        document.querySelectorAll('.lang-selector a').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const lang = link.getAttribute('data-lang');
                this.switchLanguage(lang);
            });
        });
    }

    switchLanguage(lang) {
        this.currentLang = lang;
        this.setStoredLanguage(lang);
        this.applyLanguage(lang);
        
        // Update active link
        document.querySelectorAll('.lang-selector a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-lang') === lang) {
                link.classList.add('active');
            }
        });

        // Trigger language change event
        window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
    }

    applyLanguage(lang) {
        // Update all elements with data-lang-* attributes
        document.querySelectorAll('[data-lang-en], [data-lang-sw]').forEach(el => {
            const content = el.getAttribute(`data-lang-${lang}`);
            if (content) {
                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    el.placeholder = content;
                } else {
                    el.textContent = content;
                }
            }
        });

        // Update all elements with data-html-lang-* attributes (for HTML content)
        document.querySelectorAll('[data-html-en], [data-html-sw]').forEach(el => {
            const content = el.getAttribute(`data-html-${lang}`);
            if (content) {
                el.innerHTML = content;
            }
        });

        // Show/hide language-specific content
        document.querySelectorAll('.lang-en, .lang-sw').forEach(el => {
            if (el.classList.contains(`lang-${lang}`)) {
                el.style.display = 'block';
            } else {
                el.style.display = 'none';
            }
        });

        // Update HTML lang attribute
        document.documentElement.lang = lang;
    }

    setupPageTranslations() {
        // This function can be overridden per page
        // for custom translation handling
    }

    getCurrentLanguage() {
        return this.currentLang;
    }
}

// =====================================================
// TABLE OF CONTENTS MANAGER
// =====================================================

class TableOfContentsManager {
    constructor() {
        this.chapters = [
            { id: 1, nameEn: 'Computer Fundamentals', nameSw: 'Misingi ya Kompyuta', sections: 5 },
            { id: 2, nameEn: 'Computer Hardware', nameSw: 'Sehemu za Kompyuta', sections: 6 },
            { id: 3, nameEn: 'Operating Systems', nameSw: 'Mifumo ya Uendeshaji', sections: 5 },
            { id: 4, nameEn: 'File Management', nameSw: 'Usimamizi wa Faili', sections: 4 },
            { id: 5, nameEn: 'Introduction to Networking', nameSw: 'Utangamano wa Kompyuta', sections: 5 },
            { id: 6, nameEn: 'Internet Basics', nameSw: 'Misingi ya Intaneti', sections: 5 },
            { id: 7, nameEn: 'Email & Communication', nameSw: 'Barua Pepe na Mawasiliano', sections: 4 },
            { id: 8, nameEn: 'Introduction to MS Office', nameSw: 'Utangamano wa MS Office', sections: 5 },
            { id: 9, nameEn: 'Word Processing', nameSw: 'Tahariri ya Matini', sections: 5 },
            // Additional chapters would be added here (10-24)
        ];
    }

    getChapters() {
        return this.chapters;
    }

    getChapter(id) {
        return this.chapters.find(ch => ch.id === id);
    }

    getNextChapter(currentId) {
        return this.chapters.find(ch => ch.id === currentId + 1);
    }

    getPreviousChapter(currentId) {
        return this.chapters.find(ch => ch.id === currentId - 1);
    }
}

// =====================================================
// CHAPTER INTERACTION MANAGER
// =====================================================

class ChapterInteractionManager {
    constructor() {
        this.currentChapter = this.getChapterIdFromURL();
        this.answers = {};
        this.init();
    }

    init() {
        this.setupQuestionInteraction();
        this.setupExerciseInteraction();
        this.setupPrintButton();
        this.setupDownloadButton();
    }

    getChapterIdFromURL() {
        const params = new URLSearchParams(window.location.search);
        return params.get('ch') || 1;
    }

    setupQuestionInteraction() {
        // Handle self-check questions
        document.querySelectorAll('.question').forEach((q, idx) => {
            const qId = `q-${this.currentChapter}-${idx}`;
            const inputs = q.querySelectorAll('input[type="radio"], input[type="checkbox"]');
            
            inputs.forEach(input => {
                input.addEventListener('change', () => {
                    this.recordAnswer(qId, input.value);
                });
            });
        });

        // Show/hide answers button
        const answerBtn = document.getElementById('showAnswersBtn');
        if (answerBtn) {
            answerBtn.addEventListener('click', () => {
                this.toggleAnswers();
            });
        }
    }

    setupExerciseInteraction() {
        // Handle practical exercises
        document.querySelectorAll('.practical-exercise').forEach((ex, idx) => {
            const exId = `ex-${this.currentChapter}-${idx}`;
            const completeBtn = document.createElement('button');
            completeBtn.className = 'btn btn-success';
            completeBtn.textContent = 'Mark as Complete';
            completeBtn.addEventListener('click', () => {
                this.markExerciseComplete(exId);
            });
            ex.appendChild(completeBtn);
        });
    }

    setupPrintButton() {
        const printBtn = document.getElementById('printBtn');
        if (printBtn) {
            printBtn.addEventListener('click', () => {
                window.print();
            });
        }
    }

    setupDownloadButton() {
        const downloadBtn = document.getElementById('downloadBtn');
        if (downloadBtn) {
            downloadBtn.addEventListener('click', () => {
                this.downloadAsPDF();
            });
        }
    }

    recordAnswer(questionId, answer) {
        this.answers[questionId] = answer;
        localStorage.setItem(`chapter-${this.currentChapter}-answers`, JSON.stringify(this.answers));
    }

    toggleAnswers() {
        document.querySelectorAll('.answer').forEach(ans => {
            ans.style.display = ans.style.display === 'none' ? 'block' : 'none';
        });
    }

    markExerciseComplete(exerciseId) {
        const completedExercises = JSON.parse(localStorage.getItem('completedExercises') || '[]');
        if (!completedExercises.includes(exerciseId)) {
            completedExercises.push(exerciseId);
            localStorage.setItem('completedExercises', JSON.stringify(completedExercises));
            alert('Exercise marked as complete!');
        }
    }

    downloadAsPDF() {
        // This would integrate with a PDF library like html2pdf or similar
        const element = document.querySelector('.chapter-container');
        const opt = {
            margin: 10,
            filename: `chapter-${this.currentChapter}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' }
        };
        // html2pdf().set(opt).save();
    }
}

// =====================================================
// ASSESSMENT TRACKER
// =====================================================

class AssessmentTracker {
    constructor() {
        this.init();
    }

    init() {
        this.trackProgress();
        this.setupAssessmentSubmission();
    }

    trackProgress() {
        const totalChapters = 24;
        const completedChapters = JSON.parse(localStorage.getItem('completedChapters') || '[]').length;
        const progressPercentage = (completedChapters / totalChapters) * 100;
        
        const progressBar = document.getElementById('progressBar');
        if (progressBar) {
            progressBar.style.width = progressPercentage + '%';
            progressBar.textContent = Math.round(progressPercentage) + '%';
        }
    }

    setupAssessmentSubmission() {
        const assessmentForm = document.getElementById('assessmentForm');
        if (assessmentForm) {
            assessmentForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.submitAssessment();
            });
        }
    }

    submitAssessment() {
        const formData = new FormData(document.getElementById('assessmentForm'));
        const assessment = Object.fromEntries(formData);
        const score = this.calculateScore(assessment);
        
        alert(`Assessment submitted! Your score: ${score}%`);
        
        // Store assessment results
        const results = JSON.parse(localStorage.getItem('assessmentResults') || '[]');
        results.push({
            date: new Date().toISOString(),
            chapter: this.getChapterFromURL(),
            score: score,
            answers: assessment
        });
        localStorage.setItem('assessmentResults', JSON.stringify(results));
    }

    calculateScore(assessment) {
        // Placeholder - actual scoring logic would go here
        return Math.floor(Math.random() * 41) + 60; // Random score 60-100
    }

    getChapterFromURL() {
        const params = new URLSearchParams(window.location.search);
        return params.get('ch') || 1;
    }
}

// =====================================================
// SEARCH & GLOSSARY
// =====================================================

class GlossarySearch {
    constructor() {
        this.glossary = this.loadGlossary();
        this.setupSearch();
    }

    loadGlossary() {
        // This would load from a data file or API
        return {
            'cpu': { en: 'Central Processing Unit', sw: 'Kigeuzi Kuu cha Kuhesabu' },
            'ram': { en: 'Random Access Memory', sw: 'Kumbukumbu ya Upatikanaji wa Nasibu' },
            'rom': { en: 'Read-Only Memory', sw: 'Kumbukumbu ya Kusomwa tu' },
            'hardware': { en: 'Physical components of a computer', sw: 'Sehemu halisi za kompyuta' },
            'software': { en: 'Computer programs and operating systems', sw: 'Programu za kompyuta' }
        };
    }

    setupSearch() {
        const searchInput = document.getElementById('glossarySearch');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchGlossary(e.target.value);
            });
        }
    }

    searchGlossary(query) {
        const results = document.getElementById('glossaryResults');
        if (!results) return;

        const matches = Object.entries(this.glossary).filter(([term]) =>
            term.toLowerCase().includes(query.toLowerCase())
        );

        if (matches.length === 0) {
            results.innerHTML = '<p>No results found</p>';
            return;
        }

        results.innerHTML = matches.map(([term, definitions]) =>
            `<div class="glossary-term">
                <strong>${term}</strong>
                <div class="en">${definitions.en}</div>
                <div class="sw">${definitions.sw}</div>
            </div>`
        ).join('');
    }
}

// =====================================================
// CHAPTER NAVIGATION SYSTEM
// =====================================================

class ChapterNavigationSystem {
    constructor() {
        this.chapters = [
            { num: 1, title: 'What is a Computer?', titleSw: 'Kompyuta ni nini?' },
            { num: 2, title: 'Computer Components & Hardware', titleSw: 'Sehemu za Juzuu za Kompyuta' },
            { num: 3, title: 'Operating System Basics', titleSw: 'Misingi ya Mfumo wa Uendeshaji' },
            { num: 4, title: 'Setting Up Your Workspace', titleSw: 'Kuandaa Eneo Lako la Kazi' },
            { num: 5, title: 'Starting & Shutting Down', titleSw: 'Kuanza na Kuzima' },
            { num: 6, title: 'Using Mouse & Keyboard', titleSw: 'Matumizi ya Panya na Kibodi' },
            { num: 7, title: 'Files & Folders', titleSw: 'Faili na Folda' },
            { num: 8, title: 'Data Storage & Backup', titleSw: 'Hifadhi ya Data na Nakala' },
            { num: 9, title: 'Data Protection & Security', titleSw: 'Ulinzi wa Data na Usalama' },
            { num: 10, title: 'Word Processing Intro', titleSw: 'Kuandika Nakala - Utangamano' },
            { num: 11, title: 'Email Fundamentals', titleSw: 'Misingi ya Barua Pepe' },
            { num: 12, title: 'Internet Basics', titleSw: 'Misingi ya Mtandao' },
            { num: 13, title: 'Advanced Word Processing', titleSw: 'Kuandika Nakala - Kiwango Cha Juu' },
            { num: 14, title: 'Spreadsheet Basics', titleSw: 'Misingi ya Jedwali la Hesabu' },
            { num: 15, title: 'Presentation Skills', titleSw: 'Ujuzi wa Kuwasilisha' },
            { num: 16, title: 'Internet Services', titleSw: 'Huduma za Mtandao' },
            { num: 17, title: 'Social Media & Digital Communication', titleSw: 'Mitandao ya Kijamii na Mawasiliano ya Kidijitali' },
            { num: 18, title: 'Online Safety & Cybersecurity', titleSw: 'Usalama wa Online na Ulinzi wa Sayansi ya Kompyuta' },
            { num: 19, title: 'Project Planning', titleSw: 'Kupanga Mradi' },
            { num: 20, title: 'Project Execution', titleSw: 'Utekelezaji wa Mradi' },
            { num: 21, title: 'Project Evaluation & Reflection', titleSw: 'Tathmini ya Mradi na Kufikiri' },
            { num: 22, title: 'Emerging Technologies', titleSw: 'Teknolohia Zinazoibuka' },
            { num: 23, title: 'Troubleshooting & Maintenance', titleSw: 'Kukamatia Matatizo na Matengenezo' },
            { num: 24, title: 'Capstone & Certification', titleSw: 'Mradi wa Kumalizia na Hati ya Uthibitisho' }
        ];
        
        this.init();
    }

    init() {
        this.createChapterSelector();
        this.createTableOfContentsModal();
    }

    createChapterSelector() {
        // Add chapter dropdown to navbar if it exists
        const tocLink = document.querySelector('a[data-lang-en="Table of Contents"]');
        if (!tocLink) return;

        // Create dropdown menu
        const dropdown = document.createElement('div');
        dropdown.className = 'chapter-dropdown';
        dropdown.style.cssText = `
            position: absolute;
            top: 100%;
            right: 0;
            background: white;
            border: 1px solid #ddd;
            border-radius: 8px;
            max-height: 400px;
            overflow-y: auto;
            z-index: 1000;
            display: none;
            min-width: 300px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        `;

        dropdown.innerHTML = this.chapters.map(ch => `
            <a href="chapter-${ch.num}.html" 
               class="dropdown-item" 
               style="display: block; padding: 10px 15px; text-decoration: none; color: #333; border-bottom: 1px solid #f0f0f0; transition: background 0.2s;"
               onmouseover="this.style.background='#f5f5f5'"
               onmouseout="this.style.background='white'">
                <strong>Chapter ${ch.num}:</strong> <span class="lang-en">${ch.title}</span><span class="lang-sw" style="display:none;">${ch.titleSw}</span>
            </a>
        `).join('');

        // Insert dropdown after TOC link
        const navContainer = tocLink.parentElement.parentElement;
        navContainer.style.position = 'relative';
        navContainer.appendChild(dropdown);

        // Toggle dropdown on click
        tocLink.addEventListener('click', (e) => {
            e.preventDefault();
            dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!navContainer.contains(e.target)) {
                dropdown.style.display = 'none';
            }
        });
    }

    createTableOfContentsModal() {
        // Create modal for full table of contents
        if (document.getElementById('tocModal')) return; // Already exists

        const modal = document.createElement('div');
        modal.id = 'tocModal';
        modal.style.cssText = `
            display: none;
            position: fixed;
            z-index: 9999;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,0.5);
        `;

        const content = document.createElement('div');
        content.style.cssText = `
            background-color: white;
            margin: 5% auto;
            padding: 30px;
            border-radius: 12px;
            width: 90%;
            max-width: 600px;
            max-height: 80vh;
            overflow-y: auto;
            box-shadow: 0 8px 24px rgba(0,0,0,0.2);
        `;

        content.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                <h2 style="margin: 0; color: #1E40AF;">
                    <span class="lang-en">Table of Contents</span>
                    <span class="lang-sw" style="display: none;">Muhtasari wa Matukio</span>
                </h2>
                <button onclick="document.getElementById('tocModal').style.display='none'" style="background: none; border: none; font-size: 28px; cursor: pointer; color: #666;">&times;</button>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                ${this.chapters.map(ch => `
                    <a href="chapter-${ch.num}.html" 
                       style="padding: 15px; background: #f5f5f5; border-radius: 8px; text-decoration: none; color: #333; transition: all 0.3s; border-left: 4px solid #1E40AF;"
                       onmouseover="this.style.background='#e8f0ff'"
                       onmouseout="this.style.background='#f5f5f5'">
                        <div style="font-weight: 700; color: #1E40AF;">Ch. ${ch.num}</div>
                        <div style="font-size: 0.9rem;">
                            <span class="lang-en">${ch.title}</span>
                            <span class="lang-sw" style="display: none;">${ch.titleSw}</span>
                        </div>
                    </a>
                `).join('')}
            </div>
        `;

        modal.appendChild(content);
        document.body.appendChild(modal);

        // Open modal when clicking Table of Contents
        const tocLink = document.querySelector('a[data-lang-en="Table of Contents"]');
        if (tocLink) {
            tocLink.addEventListener('click', (e) => {
                e.preventDefault();
                modal.style.display = 'block';
            });
        }
    }
}

// =====================================================
// INITIALIZATION
// =====================================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize bilingual system
    window.bilingualSystem = new BilingualSystem();

    // Initialize chapter navigation system
    window.chapterNav = new ChapterNavigationSystem();

    // Initialize table of contents
    window.tocManager = new TableOfContentsManager();

    // Initialize chapter interactions
    if (document.querySelector('.chapter-container')) {
        window.chapterManager = new ChapterInteractionManager();
    }

    // Initialize assessment tracker
    if (document.getElementById('assessmentForm')) {
        window.assessmentTracker = new AssessmentTracker();
    }

    // Initialize glossary search
    if (document.getElementById('glossarySearch')) {
        window.glossarySearch = new GlossarySearch();
    }

    console.log('Jifunze Computer KWA Urahisi - System Ready');
});
