import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function wrapText(text, maxCharsPerLine = 95) {
  const words = text.split(/\s+/);
  const lines = [];
  let current = '';
  for (const w of words) {
    if ((current + ' ' + w).trim().length <= maxCharsPerLine) {
      current = (current + ' ' + w).trim();
    } else {
      lines.push(current);
      current = w;
    }
  }
  if (current) lines.push(current);
  return lines;
}

async function generateSupervisorPDF() {
  const pdfDoc = await PDFDocument.create();
  const fonts = {
    regular: await pdfDoc.embedFont(StandardFonts.TimesRoman),
    bold: await pdfDoc.embedFont(StandardFonts.TimesRomanBold),
  };

  const pageWidth = 595.276; // A4 points
  const pageHeight = 841.89;
  const marginLeft = 50;
  const marginRight = 50;
  const usableWidth = pageWidth - marginLeft - marginRight;

  // Title Page
  const titlePage = pdfDoc.addPage([pageWidth, pageHeight]);
  titlePage.drawText('Civil QC Application', {
    x: marginLeft,
    y: pageHeight - 140,
    size: 30,
    font: fonts.bold,
    color: rgb(0.06, 0.07, 0.18),
  });

  titlePage.drawText('Comprehensive Supervisor Documentation', {
    x: marginLeft,
    y: pageHeight - 180,
    size: 16,
    font: fonts.regular,
    color: rgb(0.15, 0.16, 0.22),
  });

  const metaLines = [
    `Generated: ${new Date().toLocaleString()}`,
    'Prepared for: Project Supervisor',
    'Prepared by: Civil QC Development Team',
    'Version: 1.0',
  ];

  let metaY = pageHeight - 230;
  for (const line of metaLines) {
    titlePage.drawText(line, {
      x: marginLeft,
      y: metaY,
      size: 11,
      font: fonts.regular,
      color: rgb(0.2, 0.2, 0.2),
    });
    metaY -= 18;
  }

  titlePage.drawText('Executive Summary', {
    x: marginLeft,
    y: metaY - 30,
    size: 14,
    font: fonts.bold,
    color: rgb(0.06, 0.07, 0.18),
  });

  const exec = `This document provides a concise, supervisor-focused overview of the Civil QC Application, covering architecture, technical stack, features, security posture, testing strategy, and the roadmap. The goal is to give stakeholders a clear understanding of the product scope, current status, and next steps.`;
  const execLines = wrapText(exec, 110);
  let y = metaY - 60;
  for (const l of execLines) {
    titlePage.drawText(l, { x: marginLeft, y, size: 11, font: fonts.regular, color: rgb(0.18,0.18,0.18) });
    y -= 16;
  }

  // Sections to include (supervisor-friendly ordering)
  const sections = [
    { title: 'Project Overview', content: `The Civil QC Application is a comprehensive quality control management system for civil engineering projects. It supports project tracking, inspection data capture, test results recording, photo evidence, and report generation tailored for excavation and concrete quality control.` },

    { title: 'Technical Stack', content: `Frontend: React + TypeScript\nUI: Tailwind CSS\nState Management: Zustand\nBackend: Firebase Firestore\nAuthentication: Firebase Auth\nHosting: Vite dev server / Firebase Hosting` },

    { title: 'Features', content: `Core features include project management, user authentication, excavation and concrete QC workflows, real-time data entry, offline-capable Firestore sync, and PDF report generation for compliance and archival.` },

    { title: 'App Screens Functionality', content: `Authentication: Login, Sign up, Password recovery, Session handling.\nProject Management: Dashboard (MyProjects), Project details, Create/Edit/Delete flows.\nQuality Control: Excavation Screen (measurements, compaction reports, photos), White Concrete Screen (mix & test results, curing).\nCommon UI: Reusable Buttons, Inputs, Form validation, Loading indicators, Notifications.` },

    { title: 'Architecture', content: `Component-based React architecture. Clear separation between UI components, domain modules (project, excavation), and library utilities (firebase config, store). Zustand provides a centralized store with Firestore-backed persistence for sync and optimistic updates.` },

    { title: 'Setup and Installation', content: `Prerequisites: Node.js 16+, npm.\nSteps: clone repo, npm install, create .env with VITE_FIREBASE_* keys, npm run dev.\nProduction: npm run build then firebase deploy.` },

    { title: 'Security Considerations', content: `Authentication enforcement via Firebase Auth, Firestore Security Rules to restrict access, environment variables for secrets, input validation, and role-based access for supervisors vs field users. Regular security audits recommended.` },

    { title: 'Testing Procedures', content: `Unit tests: Jest for core logic.\nE2E: Cypress for user flows.\nIntegration: Firebase emulator for testing Firestore rules and auth.\nAcceptance: Manual test cases for supervisor sign-off.` },

    { title: 'Best Practices', content: `Follow TypeScript strict mode, consistent code formatting (ESLint/Prettier), write unit tests for new features, use feature branches, perform code reviews, and document changes in changelog.` },

    { title: 'Troubleshooting Guide', content: `Common issues and quick fixes: auth misconfiguration, Firestore rules failures, environment variable errors, and steps to collect logs and reproduce issues.` },

    { title: 'Future Roadmap', content: `Planned: Mobile app, offline-first improvements, advanced reporting, integrations with other construction tools, and supervisor analytics dashboard.` },

    { title: 'Contributing Guidelines', content: `Fork -> Feature branch -> Tests -> PR -> Review. Maintain clear commit messages and include tests.` },

    { title: 'Support Information', content: `Technical Support: support@civilqc.com\nBug Reports: bugs@civilqc.com\nFeature Requests: features@civilqc.com` },
  ];

  // Function to add section with page flow
  function addSection(page, startY, title, content) {
    const titleSize = 14;
    const bodySize = 11;
    let curY = startY;

    page.drawText(title, { x: marginLeft, y: curY, size: titleSize, font: fonts.bold, color: rgb(0.06,0.07,0.18) });
    curY -= 22;

    const wrapped = wrapText(content, 110);
    for (const line of wrapped) {
      if (curY < 80) {
        // need new page
        return { nextPage: true, curY, linesRemaining: wrapped.slice(wrapped.indexOf(line)) };
      }
      page.drawText(line, { x: marginLeft, y: curY, size: bodySize, font: fonts.regular, color: rgb(0.16,0.16,0.16) });
      curY -= 15;
    }

    return { nextPage: false, curY };
  }

  // Add sections, ensuring page breaks between sections as needed
  let currentPage = pdfDoc.addPage([pageWidth, pageHeight]);
  let currentY = pageHeight - 80;

  for (const sec of sections) {
    // Leave a small gap
    if (currentY < 160) {
      currentPage = pdfDoc.addPage([pageWidth, pageHeight]);
      currentY = pageHeight - 80;
    }

    const result = addSection(currentPage, currentY, sec.title, sec.content);
    if (result.nextPage) {
      // create additional page and dump remaining lines
      currentPage = pdfDoc.addPage([pageWidth, pageHeight]);
      currentY = pageHeight - 80;
      const remaining = result.linesRemaining || [];
      for (const line of remaining) {
        if (currentY < 80) {
          currentPage = pdfDoc.addPage([pageWidth, pageHeight]);
          currentY = pageHeight - 80;
        }
        currentPage.drawText(line, { x: marginLeft, y: currentY, size: 11, font: fonts.regular, color: rgb(0.16,0.16,0.16) });
        currentY -= 15;
      }
      currentY -= 20;
    } else {
      currentY = result.curY - 20;
    }
  }

  // Footer on last page
  const lastPage = pdfDoc.getPages()[pdfDoc.getPages().length - 1];
  lastPage.drawText('© Civil QC Development Team', { x: marginLeft, y: 40, size: 9, font: fonts.regular, color: rgb(0.4,0.4,0.4) });

  const pdfBytes = await pdfDoc.save();
  const outPath = path.join(__dirname, '..', 'Civil_QC_Application_Supervisor_Documentation.pdf');
  fs.writeFileSync(outPath, pdfBytes);
  console.log('✓ Supervisor PDF generated:', outPath);
}

generateSupervisorPDF().catch(err => { console.error(err); process.exit(1); });
