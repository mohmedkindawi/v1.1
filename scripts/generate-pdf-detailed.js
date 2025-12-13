import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function mdToPlainLines(md) {
  // Simple conversion: remove markdown syntax, keep headers and lists readable
  const lines = md.split(/\r?\n/);
  const out = [];
  for (let l of lines) {
    l = l.replace(/^#{1,6}\s*/, (m) => m.trim()); // remove leading #
    l = l.replace(/\*\*([^*]+)\*\*/g, '$1');
    l = l.replace(/\*\s?/g, '• ');
    l = l.replace(/`([^`]+)`/g, '$1');
    l = l.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1 ($2)');
    l = l.replace(/^-\s*/g, '• ');
    // trim trailing spaces
    out.push(l);
  }
  return out;
}

function wrapText(text, maxChars = 100) {
  const words = text.split(/\s+/);
  const lines = [];
  let cur = '';
  for (const w of words) {
    if ((cur + ' ' + w).trim().length <= maxChars) {
      cur = (cur + ' ' + w).trim();
    } else {
      lines.push(cur);
      cur = w;
    }
  }
  if (cur) lines.push(cur);
  return lines;
}

async function generateDetailedPDF() {
  const mdPath = path.join(__dirname, '..', 'CASE_STUDY.md');
  if (!fs.existsSync(mdPath)) {
    console.error('CASE_STUDY.md not found at', mdPath);
    process.exit(1);
  }
  const md = fs.readFileSync(mdPath, 'utf-8');
  // Sanitize problematic characters that standard PDF fonts can't encode.
  // Replace box-drawing characters and other symbols, then remove any remaining non-ASCII characters.
  let sanitized = md.replace(/[├┤└┘│─┬┴┼═║╔╗╝╚]/g, '-').replace(/→/g, '->');
  sanitized = sanitized.replace(/✅/g, 'OK');
  // Remove any remaining non-ASCII characters which may cause encoding errors with StandardFonts
  sanitized = sanitized.replace(/[^\x00-\x7F]/g, '');
  const mdLines = mdToPlainLines(sanitized);

  const pdfDoc = await PDFDocument.create();
  const fonts = {
    regular: await pdfDoc.embedFont(StandardFonts.TimesRoman),
    bold: await pdfDoc.embedFont(StandardFonts.TimesRomanBold),
  };

  const pageWidth = 595.276;
  const pageHeight = 841.89;
  const marginLeft = 50;
  const marginRight = 50;
  const usableWidth = pageWidth - marginLeft - marginRight;

  // Title page
  const titlePage = pdfDoc.addPage([pageWidth, pageHeight]);
  titlePage.drawText('Civil QC Application', { x: marginLeft, y: pageHeight - 120, size: 28, font: fonts.bold, color: rgb(0.06,0.07,0.18) });
  titlePage.drawText('Comprehensive Application Documentation', { x: marginLeft, y: pageHeight - 150, size: 14, font: fonts.regular, color: rgb(0.15,0.15,0.15) });
  titlePage.drawText(`Generated: ${new Date().toLocaleString()}`, { x: marginLeft, y: pageHeight - 180, size: 10, font: fonts.regular, color: rgb(0.2,0.2,0.2) });

  // Add content from markdown, paginated
  let page = pdfDoc.addPage([pageWidth, pageHeight]);
  let y = pageHeight - 60;
  const titleSize = 13;
  const bodySize = 10.5;

  function ensureSpace(linesNeeded) {
    if (y - linesNeeded * 14 < 60) {
      page = pdfDoc.addPage([pageWidth, pageHeight]);
      y = pageHeight - 60;
    }
  }

  for (let rawLine of mdLines) {
    const line = rawLine.trim();
    if (!line) { y -= 8; continue; }

    // treat headers
    if (/^Executive Summary|^Project Overview|^Key Features|^Technical Architecture|^Design System|^User Workflows|^Security & Data Protection|^Performance Optimizations|^Project Structure|^Implementation Highlights|^Future Roadmap|^Conclusion|^Appendix/i.test(line)) {
      ensureSpace(3);
      page.drawText(line, { x: marginLeft, y, size: titleSize, font: fonts.bold, color: rgb(0.05,0.06,0.12) });
      y -= 18;
      continue;
    }

    // bullet or long text
    if (line.startsWith('•')) {
      const wrapped = wrapText(line, 90);
      ensureSpace(wrapped.length + 1);
      for (const wl of wrapped) {
        page.drawText(wl, { x: marginLeft + 10, y, size: bodySize, font: fonts.regular, color: rgb(0.12,0.12,0.12) });
        y -= 14;
      }
      continue;
    }

    // code block or preformatted (skip fencing)
    if (/^```/.test(line)) continue;

    // normal paragraph
    const wrapped = wrapText(line, 110);
    ensureSpace(wrapped.length + 1);
    for (const wl of wrapped) {
      page.drawText(wl, { x: marginLeft, y, size: bodySize, font: fonts.regular, color: rgb(0.14,0.14,0.14) });
      y -= 14;
    }
  }

  // Footer on last page
  const lastPage = pdfDoc.getPages()[pdfDoc.getPages().length - 1];
  lastPage.drawText('Civil QC Application — Comprehensive Documentation', { x: marginLeft, y: 40, size: 9, font: fonts.regular, color: rgb(0.45,0.45,0.45) });

  const outPath = path.join(__dirname, '..', 'Civil_QC_Application_Comprehensive_Documentation.pdf');
  const pdfBytes = await pdfDoc.save();
  fs.writeFileSync(outPath, pdfBytes);
  console.log('✓ Comprehensive PDF written to', outPath);
}

generateDetailedPDF().catch(err => { console.error(err); process.exit(1); });