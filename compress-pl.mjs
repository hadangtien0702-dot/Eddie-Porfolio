import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const intputDir = 'g:/2026/Porto/V31.0/V3/public/images/casestudy/thinksmart/product-line';
const outputDir = 'g:/2026/Porto/V31.0/V3/public/images/casestudy/thinksmart/product-line';

if (!fs.existsSync(intputDir)) {
  console.error('Input directory does not exist');
  process.exit(1);
}

const files = fs.readdirSync(intputDir);

const tasks = files.map(file => {
  if (file.toLowerCase().endsWith('.png')) {
    const inputPath = path.join(intputDir, file);
    const newName = file.replace(/\.png$/i, '.webp');
    const outputPath = path.join(outputDir, newName);

    return sharp(inputPath)
      .resize({ width: 1200, withoutEnlargement: true })
      .webp({ quality: 85 })
      .toFile(outputPath)
      .then(info => {
         console.log(`Compressed ${file} -> ${newName} (${(info.size / 1024).toFixed(2)} KB)`);
         fs.unlinkSync(inputPath);
         return newName;
      })
      .catch(err => console.error(`Error with ${file}:`, err));
  }
  return Promise.resolve(null);
});

Promise.all(tasks).then(() => {
  console.log('Done compressing Product Line images.');
});
