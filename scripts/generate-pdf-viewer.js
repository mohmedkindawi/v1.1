import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generatePDF() {
  // Create a new PDF document
  const pdfDoc = await PDFDocument.create();
  const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
  const timesBoldFont = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);

  // Add the title page
  const titlePage = pdfDoc.addPage([595.276, 841.890]); // A4 size
  const titleFontSize = 24;
  const normalFontSize = 12;

  // Title page content
  titlePage.drawText('Civil QC Application', {
    x: 50,
    y: 750,
    size: titleFontSize,
    font: timesBoldFont,
    color: rgb(0, 0, 0),
  });

  titlePage.drawText('Comprehensive Documentation', {
    x: 50,
    y: 700,
    size: 18,
    font: timesRomanFont,
    color: rgb(0, 0, 0),
  });

  titlePage.drawText(`Generated: ${new Date().toLocaleDateString()}`, {
    x: 50,
    y: 650,
    size: normalFontSize,
    font: timesRomanFont,
    color: rgb(0, 0, 0),
  });

  // Add content sections
  const sections = [
    {
      title: 'Project Overview',
      content: `The Civil QC Application is a comprehensive quality control management system 
      designed for civil engineering projects. It provides a robust platform for tracking, 
      managing, and documenting quality control processes in construction projects, with a 
      focus on excavation and concrete works.`
    },
    {
      title: 'Technical Stack',
      content: `• Frontend: React + TypeScript
• UI Framework: Tailwind CSS
• State Management: Zustand
• Backend/Database: Firebase (Firestore)
• Authentication: Firebase Auth
• Hosting: Firebase Hosting`
    },
    {
      title: 'Features',
      content: `Core Functionality:
• Project Management
• User Authentication
• Excavation Quality Control
• Concrete Quality Control
• Real-time Data Entry
• PDF Report Generation`
    },
    {
      title: 'App Screens Functionality',
      content: `1. Authentication Screens:
• Login Form: Email/password authentication with error handling
• Sign Up Form: New user registration with validation
• Forgot Password: Password recovery via email
• Auth Layout: Consistent authentication UI wrapper

2. Project Management Screens:
• MyProjects: Dashboard showing all projects with filtering and sorting
• Project Information: Detailed project view and editing
• Project Actions: Add, edit, delete project operations
• Basics Screen: Initial project setup and configuration

3. Quality Control Screens:
• Excavation Screen: 
  - Excavation depth measurements
  - Soil type classification
  - Compaction test results
  - Photo documentation
  - Real-time validation

• White Concrete Screen:
  - Concrete mix specifications
  - Strength testing results
  - Temperature monitoring
  - Curing conditions
  - Quality checkpoints

4. Common UI Components:
• Button: Reusable button component with multiple variants
• Form inputs with validation
• Loading indicators
• Error messages
• Success notifications

Each screen implements:
• Real-time data sync with Firestore
• Form validation and error handling
• Responsive design for all devices
• Loading states during async operations
• Error boundaries for robust error handling
• Optimistic UI updates for better UX`
    },
    {
      title: 'Architecture',
      content: `The application follows a component-based architecture using React and TypeScript:

src/
  - components/       # Reusable UI components
    - auth/          # Authentication related components
    - excavation/    # Excavation module components
    - project/       # Project management components
    - ui/            # Common UI components
  - lib/             # Core utilities and configurations
  - App.tsx          # Main application component`
    },
    {
      title: 'Setup and Installation',
      content: `Prerequisites:
• Node.js 16.x or later
• npm 7.x or later
• Firebase account and project

Installation Steps:
1. Clone the repository
2. Run 'npm install'
3. Configure Firebase credentials
4. Start with 'npm run dev'`
    },
    {
      title: 'Security Considerations',
      content: `• Secure Firebase Authentication implementation
• Firestore security rules enforcement
• Environment variables for sensitive data
• Input validation and sanitization
• Role-based access control
• Regular security audits`
    },
    {
      title: 'Testing Procedures',
      content: `• Unit Testing with Jest
• Integration Testing
• E2E Testing with Cypress
• Component Testing
• Performance Testing
• Security Testing`
    },
    {
      title: 'Best Practices',
      content: `• Follow TypeScript strict mode
• Implement proper error handling
• Use React best practices
• Maintain code documentation
• Follow Git workflow
• Regular code reviews
• Performance optimization`
    },
    {
      title: 'Troubleshooting Guide',
      content: `Common Issues:

1. Authentication Issues
   • Verify Firebase configuration
   • Check user permissions
   • Validate email verification

2. Data Synchronization
   • Check network connectivity
   • Verify Firestore rules
   • Clear browser cache

3. Performance Issues
   • Monitor bundle size
   • Check network requests
   • Analyze React components`
    },
    {
      title: 'Future Roadmap',
      content: `Planned Features:
• Mobile application development
• Offline mode support
• Advanced reporting system
• Third-party integrations
• Real-time collaboration
• AI-powered insights`
    },
    {
      title: 'Contributing Guidelines',
      content: `1. Fork the repository
2. Create feature branch
3. Follow coding standards
4. Write tests
5. Submit pull request
6. Code review process
7. Merge to main branch`
    },
    {
      title: 'Support Information',
      content: `Contact:
• Technical Support: support@civilqc.com
• Bug Reports: bugs@civilqc.com
• Feature Requests: features@civilqc.com

Version: 1.0.0 (October 2025)`
    }
  ];

  // Add each section to the PDF
  let currentY = 750;
  let currentPage;
  
  for (const section of sections) {
    if (!currentPage || currentY < 100) {
      currentPage = pdfDoc.addPage([595.276, 841.890]); // A4 size
      currentY = 750;
    }

    // Add section title
    currentPage.drawText(section.title, {
      x: 50,
      y: currentY,
      size: 16,
      font: timesBoldFont,
      color: rgb(0, 0, 0),
    });

    currentY -= 30;

    // Add section content
    const contentLines = section.content.split('\n');
    for (const line of contentLines) {
      if (currentY < 100) {
        currentPage = pdfDoc.addPage([595.276, 841.890]);
        currentY = 750;
      }

      currentPage.drawText(line.trim(), {
        x: 50,
        y: currentY,
        size: normalFontSize,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
      });

      currentY -= 20;
    }

    currentY -= 40; // Space between sections
  }

  // Save the PDF
  const pdfBytes = await pdfDoc.save();
  const outputPath = path.join(__dirname, '..', 'Civil_QC_Application_Documentation.pdf');
  fs.writeFileSync(outputPath, pdfBytes);
  
  console.log(`✓ PDF documentation generated: ${outputPath}`);
  console.log('\nPDF includes:');
  console.log('- Complete project overview');
  console.log('- Technical stack details');
  console.log('- Architecture documentation');
  console.log('- Setup instructions');
  console.log('- Security considerations');
  console.log('- Testing procedures');
  console.log('- Best practices');
  console.log('- Troubleshooting guide');
  console.log('- Future roadmap');
  console.log('- Contributing guidelines');
  console.log('- Support information');
}

generatePDF().catch(console.error);