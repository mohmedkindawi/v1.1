import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const htmlPath = join(__dirname, '..', 'Presentation.html');
const pdfPath = join(__dirname, '..', 'Presentation.pdf');

async function convertToPDF() {
  const methods = [
    // Try wkhtmltopdf
    async () => {
      await execAsync(`wkhtmltopdf --enable-local-file-access --print-media-type "${htmlPath}" "${pdfPath}"`);
      return 'wkhtmltopdf';
    },
    // Try weasyprint
    async () => {
      await execAsync(`weasyprint "${htmlPath}" "${pdfPath}"`);
      return 'weasyprint';
    },
    // Try chromium headless
    async () => {
      await execAsync(`chromium --headless --disable-gpu --print-to-pdf="${pdfPath}" "${htmlPath}"`);
      return 'chromium';
    },
    // Try google-chrome headless
    async () => {
      await execAsync(`google-chrome --headless --disable-gpu --print-to-pdf="${pdfPath}" "${htmlPath}"`);
      return 'google-chrome';
    }
  ];

  for (const method of methods) {
    try {
      const tool = await method();
      console.log(`✓ PDF generated successfully using ${tool}!`);
      console.log(`✓ PDF file: ${pdfPath}`);
      return true;
    } catch (error) {
      continue;
    }
  }

  console.log('⚠ No PDF conversion tool found.');
  console.log('\nAlternative: Open the HTML file and use browser Print to PDF:');
  console.log(`   file://${htmlPath}`);
  console.log('\nOr install one of these tools:');
  console.log('   - wkhtmltopdf: https://wkhtmltopdf.org/downloads.html');
  console.log('   - weasyprint: pip install weasyprint');
  console.log('   - chromium/chrome browser');
  return false;
}

convertToPDF();