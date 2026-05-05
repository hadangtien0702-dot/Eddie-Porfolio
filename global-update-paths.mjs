import fs from 'fs';
import path from 'path';

const srcDir = 'g:/2026/Porto/V31.0/V3/src';

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      if (file.endsWith('.ts') || file.endsWith('.tsx')) results.push(file);
    }
  });
  return results;
}

const allFiles = walk(srcDir);

allFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  // 1. Root folder renames
  content = content.replace(/\/images\/overview\//g, '/images/01-Overview/');
  content = content.replace(/\/images\/casestudy\//g, '/images/02-CaseStudy/');
  content = content.replace(/\/images\/services\//g, '/images/03-Services/');
  content = content.replace(/\/images\/work\//g, '/images/04-Work/');
  content = content.replace(/\/images\/social-post\//g, '/images/05-SocialPost/');

  // 2. Thinksmart subfolders (nested replacements)
  // Hero files
  const heroFiles = ['card-cover', 'herocasestudy', 'HeroCaseStudy', 'hero-logo', 'team', 'banner-01', 'banner-02'];
  heroFiles.forEach(f => {
    const regex = new RegExp(`\\/02-CaseStudy\\/thinksmart\\/${f}\\.(webp|png|jpg|jpeg)`, 'g');
    content = content.replace(regex, `/02-CaseStudy/thinksmart/01-Hero/${f}.webp`);
  });

  // Context files
  ['context', 'challenge'].forEach(f => {
    const regex = new RegExp(`\\/02-CaseStudy\\/thinksmart\\/${f}\\.(webp|png|jpg|jpeg)`, 'g');
    content = content.replace(regex, `/02-CaseStudy/thinksmart/02-Context/${f}.webp`);
  });

  // System files
  ['system', 'scaling'].forEach(f => {
    const regex = new RegExp(`\\/02-CaseStudy\\/thinksmart\\/${f}\\.(webp|png|jpg|jpeg)`, 'g');
    content = content.replace(regex, `/02-CaseStudy/thinksmart/03-System/${f}.webp`);
  });

  // Results files
  ['results', 'revenue-hero'].forEach(f => {
    const regex = new RegExp(`\\/02-CaseStudy\\/thinksmart\\/${f}\\.(webp|png|jpg|jpeg)`, 'g');
    content = content.replace(regex, `/02-CaseStudy/thinksmart/04-Results/${f}.webp`);
  });

  // Folders (ProductLine & SocialPost)
  content = content.replace(/\/02-CaseStudy\/thinksmart\/product-line\//g, '/02-CaseStudy/thinksmart/05-ProductLine/');
  content = content.replace(/\/02-CaseStudy\/thinksmart\/social-post\//g, '/02-CaseStudy/thinksmart/06-SocialPost/');

  if (content !== original) {
    fs.writeFileSync(file, content);
    console.log(`✅ Updated ${path.relative(srcDir, file)}`);
  }
});
