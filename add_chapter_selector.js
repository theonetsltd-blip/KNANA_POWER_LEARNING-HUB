#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

/**
 * Add Chapter Selector Navigation to all chapters
 * Creates a quick navigation grid allowing students to jump between chapters
 */

// Chapter selector template
function createChapterSelector(currentChapter, totalChapters = 24) {
    let buttons = '';
    
    for (let i = 1; i <= totalChapters; i++) {
        const style = i === currentChapter 
            ? 'background: #1E40AF; color: white;' 
            : 'background: #e8f0ff; color: #1E40AF;';
        buttons += `                <a href="chapter-${i}.html" style="${style} padding: 12px; border-radius: 8px; text-align: center; text-decoration: none; font-weight: 600; display: block; transition: all 0.3s;">Ch ${i}</a>\n`;
    }

    return `        <!-- ===== CHAPTER SELECTOR ===== -->
        <div style="margin: 4rem 0 3rem; padding: 2rem; background: #f8f9fa; border-radius: 12px; border-left: 5px solid #1E40AF;">
            <h3 style="text-align: center; color: #1E40AF; margin-top: 0; margin-bottom: 1.5rem; font-weight: 700;">
                <span class="lang-en">📖 Quick Jump to Any Chapter</span>
                <span class="lang-sw" style="display: none;">📖 Kuruka Haraka kwa Sura Yoyote</span>
            </h3>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 12px; margin-top: 1.5rem;">
${buttons}            </div>
        </div>

`;
}

// Process a single chapter file
function addSelectorToChapter(filePath, chapterNum, totalChapters = 24) {
    try {
        let content = fs.readFileSync(filePath, 'utf-8');
        const selector = createChapterSelector(chapterNum, totalChapters);

        // Check if selector already exists
        if (content.includes('<!-- ===== CHAPTER SELECTOR ===== -->')) {
            // Replace existing selector
            const selectorRegex = /        <!-- ===== CHAPTER SELECTOR ===== -->[\s\S]*?        <\/div>\n\n/;
            if (content.match(selectorRegex)) {
                content = content.replace(selectorRegex, selector);
            }
        } else {
            // Insert before NAVIGATION comment
            const navRegex = /(        <!-- (?:===== )?NAVIGATION)/;
            if (content.match(navRegex)) {
                content = content.replace(navRegex, selector + '$1');
            } else {
                console.warn(`⚠ Could not find insertion point in ${path.basename(filePath)}`);
                return false;
            }
        }

        fs.writeFileSync(filePath, content, 'utf-8');
        return true;
    } catch (error) {
        console.error(`✗ Error processing ${path.basename(filePath)}: ${error.message}`);
        return false;
    }
}

// Main function to process all chapters in a directory
function processAllChapters(dir, startNum = 1, endNum = 24) {
    console.log(`\n📂 Processing chapters in: ${path.basename(dir)}`);
    
    if (!fs.existsSync(dir)) {
        console.log(`⚠ Directory not found: ${dir}`);
        return 0;
    }

    let processed = 0;
    let total = endNum - startNum + 1;

    for (let i = startNum; i <= endNum; i++) {
        const filePath = path.join(dir, `chapter-${i}.html`);
        
        if (!fs.existsSync(filePath)) {
            console.log(`⚠ Skipped chapter-${i}.html (not found)`);
            continue;
        }

        const success = addSelectorToChapter(filePath, i, endNum);
        if (success) {
            console.log(`✓ Updated chapter-${i}.html`);
            processed++;
        }
    }

    return processed;
}

// Run the script
console.log('🔨 Adding Chapter Selector Navigation...');

const level1Dir = path.join(__dirname, 'chapters');
const level2Dir = path.join(__dirname, 'chapters-level2');

const updated1 = processAllChapters(level1Dir, 1, 24);
const updated2 = processAllChapters(level2Dir, 1, 20);

console.log(`\n✅ Completed!`);
console.log(`   Level 1: ${updated1}/24 chapters updated`);
console.log(`   Level 2: ${updated2}/20 chapters updated`);
