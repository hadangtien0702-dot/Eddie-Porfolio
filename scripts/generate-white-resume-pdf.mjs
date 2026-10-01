import { chromium } from '@playwright/test';
import path from 'path';

(async () => {
  console.log('Starting Playwright Chromium with crisp font antialiasing...');
  const browser = await chromium.launch({
    headless: true,
    args: [
      '--font-render-hinting=medium',
      '--enable-font-antialiasing',
      '--force-color-profile=srgb',
    ],
  });
  const context = await browser.newContext({
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();

  const baseUrl = process.env.RESUME_URL || 'http://localhost:3000/resume';

  // 1. English Resume
  console.log(`Generating English Resume from ${baseUrl}...`);
  await page.goto(baseUrl, { waitUntil: 'networkidle', timeout: 30000 });
  await page.evaluate(async () => {
    await document.fonts.ready;
  });
  await page.emulateMedia({ media: 'print' });
  const enPath = 'd:/Production/Portofolio Eddie/V3.2/V3/public/HA_DANG_TIEN_Resume.pdf';
  await page.pdf({
    path: enPath,
    format: 'A4',
    printBackground: true,
    preferCSSPageSize: true,
    pageRanges: '1',
  });
  console.log(`EN PDF generated: ${enPath}`);

  // 2. Vietnamese Resume
  const viUrl = `${baseUrl}?lang=vi`;
  console.log(`Generating Vietnamese Resume from ${viUrl}...`);
  await page.goto(viUrl, { waitUntil: 'networkidle', timeout: 30000 });
  await page.evaluate(async () => {
    await document.fonts.ready;
  });
  await page.emulateMedia({ media: 'print' });
  const viPath = 'd:/Production/Portofolio Eddie/V3.2/V3/public/HA_DANG_TIEN_CV_TiengViet.pdf';
  await page.pdf({
    path: viPath,
    format: 'A4',
    printBackground: true,
    preferCSSPageSize: true,
    pageRanges: '1',
  });
  console.log(`VI PDF generated: ${viPath}`);

  await browser.close();
  console.log('All pure white PDFs generated successfully!');
})().catch((err) => {
  console.error('Error generating PDF:', err);
  process.exit(1);
});
