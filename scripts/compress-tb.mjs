import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const intputDir = 'g:/2026/Porto/V31.0/V3/public/HUONG_DAN_HINH_ANH/04_Case_Study_DreamTalent/02_TeamBuilding_Photos';
const outputDir = 'g:/2026/Porto/V31.0/V3/public/images/casestudy/dreamtalent/teambuilding';

if (!fs.existsSync(outputDir)){
    fs.mkdirSync(outputDir, { recursive: true });
}

const files = fs.readdirSync(intputDir);

const tasks = files.map(file => {
  if (file.toLowerCase().endsWith('.jpg') || file.toLowerCase().endsWith('.jpeg') || file.toLowerCase().endsWith('.png')) {
    const inputPath = path.join(intputDir, file);
    const newName = file.replace(/\s+/g, '-').replace(/\.(png|jpeg|jpg)$/i, '.webp');
    const outputPath = path.join(outputDir, newName);

    return sharp(inputPath)
      .resize({ width: 1600, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(outputPath)
      .then(info => {
         console.log(`Compressed ${file} -> ${newName} (${(info.size / 1024).toFixed(2)} KB)`);
         return newName;
      })
      .catch(err => console.error(`Error with ${file}:`, err));
  }
  return Promise.resolve(null);
});

Promise.all(tasks).then(results => {
  const finalNames = results.filter(Boolean);
  console.log('\nFinal Images array for casestudy.ts:');
  console.log(finalNames.map(name => `\`\${SUPABASE_BASE_URL}/teambuilding/${name}\``).join(',\n'));
});
