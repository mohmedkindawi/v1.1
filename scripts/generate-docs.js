import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const markdownToHtml = (markdown) => {
  let html = markdown;

  // Headers
  html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
  html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
  html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');

  // Bold
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

  // Lists
  html = html.replace(/^\- (.*$)/gim, '<li>$1</li>');
  html = html.replace(/^(\d+)\. (.*$)/gim, '<li>$2</li>');

  // Code blocks
  html = html.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>');
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

  // Horizontal rules
  html = html.replace(/^---$/gim, '<hr/>');

  // Paragraphs
  html = html.split('\n\n').map(para => {
    if (!para.match(/^<[h|l|p|d|u]/)) {
      return `<p>${para}</p>`;
    }
    return para;
  }).join('\n');

  // Wrap lists
  html = html.replace(/(<li>.*<\/li>\n?)+/gs, '<ul>$&</ul>');

  // Checkboxes
  html = html.replace(/✅/g, '<span class="check">✓</span>');

  return html;
};

const caseStudyPath = join(__dirname, '..', 'CASE_STUDY.md');
const outputPath = join(__dirname, '..', 'Civil_QC_Application_Documentation.html');

try {
  const markdown = readFileSync(caseStudyPath, 'utf-8');
  const htmlContent = markdownToHtml(markdown);

  const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Civil QC Application - Comprehensive Documentation</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            line-height: 1.6;
            color: #1a1b37;
            background: #ffffff;
            padding: 2rem;
            max-width: 1200px;
            margin: 0 auto;
        }

        @media print {
            body {
                padding: 1rem;
                font-size: 11pt;
            }

            h1 {
                page-break-before: avoid;
                font-size: 24pt;
            }

            h2 {
                page-break-after: avoid;
                font-size: 18pt;
                margin-top: 1.5rem;
            }

            h3 {
                page-break-after: avoid;
                font-size: 14pt;
            }

            pre, code {
                page-break-inside: avoid;
            }

            ul, ol {
                page-break-inside: avoid;
            }
        }

        h1 {
            color: #1a1b37;
            font-size: 2.5rem;
            font-weight: 700;
            margin-bottom: 1rem;
            padding-bottom: 0.5rem;
            border-bottom: 4px solid #5bbfb5;
        }

        h2 {
            color: #1a1b37;
            font-size: 2rem;
            font-weight: 600;
            margin-top: 3rem;
            margin-bottom: 1rem;
            padding-bottom: 0.5rem;
            border-bottom: 2px solid #5bbfb5;
        }

        h3 {
            color: #2c3e50;
            font-size: 1.5rem;
            font-weight: 600;
            margin-top: 2rem;
            margin-bottom: 0.75rem;
        }

        p {
            margin-bottom: 1rem;
            text-align: justify;
        }

        ul, ol {
            margin-left: 2rem;
            margin-bottom: 1rem;
        }

        li {
            margin-bottom: 0.5rem;
        }

        ul ul, ol ol {
            margin-top: 0.5rem;
            margin-bottom: 0.5rem;
        }

        code {
            background: #f5f5f5;
            padding: 0.2rem 0.4rem;
            border-radius: 3px;
            font-family: 'Monaco', 'Consolas', monospace;
            font-size: 0.9em;
            color: #d63384;
        }

        pre {
            background: #2d2d2d;
            color: #f8f8f2;
            padding: 1.5rem;
            border-radius: 8px;
            overflow-x: auto;
            margin-bottom: 1.5rem;
            line-height: 1.4;
        }

        pre code {
            background: transparent;
            color: inherit;
            padding: 0;
            font-size: 0.85rem;
        }

        a {
            color: #5bbfb5;
            text-decoration: none;
            font-weight: 500;
        }

        a:hover {
            text-decoration: underline;
        }

        hr {
            border: none;
            border-top: 2px solid #e0e0e0;
            margin: 2rem 0;
        }

        strong {
            font-weight: 600;
            color: #1a1b37;
        }

        .check {
            color: #5bbfb5;
            font-weight: bold;
            font-size: 1.2em;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 1.5rem;
        }

        th, td {
            padding: 0.75rem;
            text-align: left;
            border-bottom: 1px solid #e0e0e0;
        }

        th {
            background: #f8f9fa;
            font-weight: 600;
            color: #1a1b37;
        }

        .header-info {
            background: linear-gradient(135deg, #5bbfb5 0%, #4a9d95 100%);
            color: white;
            padding: 2rem;
            border-radius: 12px;
            margin-bottom: 2rem;
            text-align: center;
        }

        .header-info h1 {
            color: white;
            border-bottom: none;
            margin-bottom: 0.5rem;
        }

        .header-info p {
            font-size: 1.1rem;
            opacity: 0.95;
            margin-bottom: 0;
        }

        .metadata {
            background: #fff6e9;
            padding: 1.5rem;
            border-radius: 8px;
            border-left: 4px solid #5bbfb5;
            margin-bottom: 2rem;
        }

        .metadata p {
            margin-bottom: 0.5rem;
        }

        blockquote {
            border-left: 4px solid #5bbfb5;
            padding-left: 1.5rem;
            margin: 1.5rem 0;
            color: #555;
            font-style: italic;
        }

        .page-break {
            page-break-after: always;
        }

        @page {
            margin: 2cm;
        }
    </style>
</head>
<body>
    <div class="header-info">
        <h1>Civil QC Application</h1>
        <p>Comprehensive Project Documentation</p>
    </div>

    <div class="metadata">
        <p><strong>Document Type:</strong> Technical Case Study & Project Documentation</p>
        <p><strong>Project:</strong> Civil Quality Control Application</p>
        <p><strong>Version:</strong> 1.0</p>
        <p><strong>Last Updated:</strong> October 2025</p>
        <p><strong>Status:</strong> Production Ready</p>
    </div>

    ${htmlContent}

    <hr>
    <footer style="text-align: center; color: #777; margin-top: 3rem; padding-top: 2rem; border-top: 2px solid #e0e0e0;">
        <p><strong>Civil QC Application</strong> - Comprehensive Project Documentation</p>
        <p>© 2025 Civil QC Development Team | Version 1.0</p>
    </footer>
</body>
</html>`;

  writeFileSync(outputPath, fullHtml, 'utf-8');
  console.log('✓ Documentation generated successfully!');
  console.log(`✓ HTML file: ${outputPath}`);
  console.log('\nTo convert to PDF:');
  console.log('1. Open the HTML file in your browser');
  console.log('2. Press Ctrl+P (or Cmd+P on Mac)');
  console.log('3. Select "Save as PDF" as the destination');
  console.log('4. Adjust settings (margins, scale) as needed');
  console.log('5. Click "Save"');
} catch (error) {
  console.error('Error generating documentation:', error);
  process.exit(1);
}
