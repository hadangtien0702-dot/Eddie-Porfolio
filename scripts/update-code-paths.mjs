import fs from 'fs';
import path from 'path';

const filesToUpdate = [
  'g:/2026/Porto/V31.0/V3/src/data/casestudy.ts',
  'g:/2026/Porto/V31.0/V3/src/app/page.tsx',
  // Thêm các file khác nếu cần
];

filesToUpdate.forEach(file => {
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');

  // 1. Rename root folders in paths
  content = content.replace(/\/images\/overview\//g, '/images/01-Overview/');
  content = content.replace(/\/images\/casestudy\//g, '/images/02-CaseStudy/');
  content = content.replace(/\/images\/services\//g, '/images/03-Services/');
  content = content.replace(/\/images\/work\//g, '/images/04-Work/');

  // 2. Specific thinksmart subfolders
  // Note: order matters.
  content = content.replace(/\/02-CaseStudy\/thinksmart\/card-cover\.webp/g, '/02-CaseStudy/thinksmart/01-Hero/card-cover.webp');
  content = content.replace(/\/02-CaseStudy\/thinksmart\/herocasestudy\.webp/g, '/02-CaseStudy/thinksmart/01-Hero/herocasestudy.webp');
  content = content.replace(/\/02-CaseStudy\/thinksmart\/hero-logo\.webp/g, '/02-CaseStudy/thinksmart/01-Hero/hero-logo.webp');
  content = content.replace(/\/02-CaseStudy\/thinksmart\/revenue-hero\.webp/g, '/02-CaseStudy/thinksmart/04-Results/revenue-hero.webp');
  
  // Folders
  content = content.replace(/\/02-CaseStudy\/thinksmart\/product-line\//g, '/02-CaseStudy/thinksmart/05-ProductLine/');
  content = content.replace(/\/02-CaseStudy\/thinksmart\/social-post\//g, '/02-CaseStudy/thinksmart/06-SocialPost/');

  fs.writeFileSync(file, content);
  console.log(`Updated paths in ${path.basename(file)}`);
});
