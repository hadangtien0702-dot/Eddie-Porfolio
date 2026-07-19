import { chromium } from '@playwright/test';
import path from 'path';

(async () => {
  console.log('Starting Playwright Chromium...');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  console.log('Navigating to http://localhost:3000/resume...');
  await page.goto('http://localhost:3000/resume', { waitUntil: 'networkidle' });
  
  console.log('Emulating print media...');
  await page.emulateMedia({ media: 'print' });
  
  const outputPath = 'd:/Porfo/V3.2/V3/resume.pdf';
  console.log(`Printing PDF to ${outputPath}...`);
  
  await page.pdf({
    path: outputPath,
    format: 'A4',
    printBackground: true,
    preferCSSPageSize: true,
    pageRanges: '1'
  });
  
  await browser.close();
  console.log('PDF generated successfully!');
})().catch(err => {
  console.error('Error printing PDF:', err);
  process.exit(1);
});
