import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
// Access device descriptors from the puppeteer module
const { devices } = puppeteer;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

(async () => {
  const url = process.argv[2] || 'http://localhost:5174';
  const outPath = path.join(__dirname, '..', 'mobile-preview.png');

  console.log(`Launching headless browser to capture ${url} ...`);
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  try {
    const page = await browser.newPage();
    // Emulate a common iPhone viewport and UA without relying on device descriptors
    const viewport = { width: 390, height: 844, deviceScaleFactor: 3, isMobile: true, hasTouch: true };
    const userAgent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1';
    await page.setViewport(viewport);
    await page.setUserAgent(userAgent);
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
    // Give app a moment to render any dynamic content
    await page.waitForTimeout(1000);
    await page.screenshot({ path: outPath, fullPage: false });
    console.log(`✓ Mobile preview saved to ${outPath}`);
    // Optionally open the image on Windows
  } catch (err) {
    console.error('Error capturing mobile preview:', err);
    process.exitCode = 1;
  } finally {
    await browser.close();
  }
})();
