import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generatePDF() {
  const htmlPath = path.join(__dirname, '..', 'Civil_QC_UI_Documentation.html');

  if (!fs.existsSync(htmlPath)) {
    console.error('HTML documentation not found. Please run generate-ui-documentation.js first.');
    process.exit(1);
  }

  console.log('Launching browser for PDF generation...');

  const browser = await puppeteer.launch({
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu',
      '--no-first-run'
    ]
  });

  const page = await browser.newPage();

  // Set viewport for better PDF rendering
  await page.setViewport({
    width: 1200,
    height: 800,
    deviceScaleFactor: 2
  });

  // Load the HTML file
  const htmlContent = fs.readFileSync(htmlPath, 'utf-8');
  await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

  // Wait for images to load
  await new Promise(resolve => setTimeout(resolve, 3000));

  // Generate PDF
  const pdfPath = path.join(__dirname, '..', 'Civil_QC_UI_Documentation.pdf');
  await page.pdf({
    path: pdfPath,
    format: 'A4',
    printBackground: true,
    margin: {
      top: '20px',
      right: '20px',
      bottom: '20px',
      left: '20px'
    },
    displayHeaderFooter: true,
    headerTemplate: `
      <div style="font-size: 10px; text-align: center; width: 100%; margin: 0 20px;">
        Civil QC Application - UI Documentation Guide
      </div>
    `,
    footerTemplate: `
      <div style="font-size: 10px; text-align: center; width: 100%; margin: 0 20px;">
        Page <span class="pageNumber"></span> of <span class="totalPages"></span>
      </div>
    `,
    preferCSSPageSize: false
  });

  await browser.close();

  console.log(`✓ PDF documentation generated: ${pdfPath}`);
  console.log('\nPDF includes:');
  console.log('- Professional header and footer');
  console.log('- High-resolution screenshots');
  console.log('- Detailed screen descriptions');
  console.log('- Navigation and interaction guides');
  console.log('- Usability tips and best practices');
  console.log('- Table of contents for easy navigation');
}

generatePDF().catch(console.error);