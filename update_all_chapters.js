#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

// Chapter selector HTML template
function createChapterSelector(currentChapter) {
    let buttons = '';
    for (let i = 1; i <= 24; i++) {
        const style = i === currentChapter 
            ? 'background: #1E40AF; color: white;' 
            : 'background: #e8f0ff; color: #1E40AF;';
        buttons += `                <a href="${i}.html" style="${style} padding: 12px; border-radius: 8px; text-align: center; text-decoration: none; font-weight: 600; display: block;">Ch ${i}</a>\n`;
    }

    return `        <!-- ===== CHAPTER SELECTOR ===== -->
        <div style="margin: 4rem 0 3rem; padding: 2rem; background: #f8f9fa; border-radius: 12px;">
            <h3 style="text-align: center; color: #1E40AF; margin-top: 0;">
                <span class="lang-en">Quick Jump to Any Chapter</span>
                <span class="lang-sw" style="display: none;">Kuruka Haraka kwa Sura Yoyote</span>
            </h3>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 12px; margin-top: 1.5rem;">
${buttons}            </div>
        </div>

`;
}

// Update chapters with selector
console.log('🔨 Updating chapters with chapter selector...');

function updateChaptersWithSelector(chaptersDir, startChapter = 1, endChapter = 24) {
    let updated = 0;
    
    for (let i = startChapter; i <= endChapter; i++) {
        const filePath = path.join(chaptersDir, `${i}.html`);
        
        if (!fs.existsSync(filePath)) {
            console.log(`⚠ Skipped: ${i}.html not found`);
            continue;
        }

        try {
            let content = fs.readFileSync(filePath, 'utf-8');
            const selector = createChapterSelector(i);

            // Check if selector already exists
            if (content.includes('<!-- ===== CHAPTER SELECTOR ===== -->')) {
                // Replace existing selector
                content = content.replace(
                    /        <!-- ===== CHAPTER SELECTOR ===== -->[\s\S]*?        <\/div>\n\n/,
                    selector
                );
            } else {
                // Insert before NAVIGATION or at end of header
                if (content.includes('<!-- ===== NAVIGATION') || content.includes('<!-- NAVIGATION -->')) {
                    content = content.replace(
                        /(        <!-- (?:===== )?NAVIGATION)/,
                        selector + '$1'
                    );
                } else {
                    console.log(`⚠ Could not find insertion point in chapter-${i}.html`);
                    continue;
                }
            }

            fs.writeFileSync(filePath, content, 'utf-8');
            console.log(`✓ Updated ${i}.html`);
            updated++;
        } catch (error) {
            console.error(`✗ Error updating ${i}.html: ${error.message}`);
        }
    }

    return updated;
}

// Run updates for both chapter directories
const chapters1Dir = path.join(__dirname, 'chapters');
const chapters2Dir = path.join(__dirname, 'chapters_level2');

console.log('\n📁 Processing Level 1 Chapters:');
if (fs.existsSync(chapters1Dir)) {
    const updated1 = updateChaptersWithSelector(chapters1Dir, 1, 24);
    console.log(`✅ Updated ${updated1} Level 1 chapters\n`);
} else {
    console.log('⚠ chapters directory not found\n');
}

console.log('📁 Processing Level 2 Chapters:');
if (fs.existsSync(chapters2Dir)) {
    const updated2 = updateChaptersWithSelector(chapters2Dir, 1, 20);
    console.log(`✅ Updated ${updated2} Level 2 chapters\n`);
} else {
    console.log('⚠ chapters-level2 directory not found\n');
}

console.log('✅ Chapter selector update complete!');
