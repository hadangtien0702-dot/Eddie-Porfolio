import fs from 'fs';
import path from 'path';

const rootDir = 'g:/2026/Porto/V31.0/Image';
const tsDir = path.join(rootDir, '02-CaseStudy', 'thinksmart');

// Tạo các subfolders trong thinksmart
const subfolders = ['01-Hero', '02-Context', '03-System', '04-Results'];
subfolders.forEach(f => {
  const p = path.join(tsDir, f);
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
});

// Di chuyển files
const moves = [
  { files: ['banner-01.webp', 'banner-02.webp', 'hero-logo.webp', 'herocasestudy.webp', 'team.webp', 'card-cover.webp', '.DS_Store'], dest: '01-Hero' },
  { files: ['context.webp', 'challenge.webp'], dest: '02-Context' },
  { files: ['system.webp', 'scaling.webp'], dest: '03-System' },
  { files: ['results.webp', 'revenue-hero.webp'], dest: '04-Results' }
];

moves.forEach(m => {
  m.files.forEach(f => {
    const src = path.join(tsDir, f);
    const dst = path.join(tsDir, m.dest, f);
    if (fs.existsSync(src)) {
      fs.renameSync(src, dst);
      console.log(`Moved ${f} to ${m.dest}`);
    }
  });
});

// Rename folders
const renameFolders = [
  { old: 'product-line', new: '05-ProductLine' },
  { old: 'social-post', new: '06-SocialPost' }
];

renameFolders.forEach(r => {
  const src = path.join(tsDir, r.old);
  const dst = path.join(tsDir, r.new);
  if (fs.existsSync(src)) {
    fs.renameSync(src, dst);
    console.log(`Renamed ${r.old} to ${r.new}`);
  }
});

console.log('Restructuring complete!');
