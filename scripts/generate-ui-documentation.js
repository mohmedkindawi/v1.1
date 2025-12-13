import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Detailed screen descriptions
const screenDetails = {
  'Sign In': {
    description: 'The Sign In screen provides secure user authentication for accessing the Civil QC Application. It features email and password fields with real-time validation and error handling.',
    functionalities: [
      'Email and password authentication',
      'Form validation with error messages',
      'Remember me functionality',
      'Forgot password link',
      'Responsive design for all devices'
    ],
    navigation: 'Accessible from the root URL when not authenticated. Redirects to dashboard upon successful login.',
    interactions: [
      'Click "Sign In" button to authenticate',
      'Click "Forgot Password?" to reset password',
      'Click "Sign Up" to create new account',
      'Form validates input in real-time'
    ],
    tips: [
      'Use a strong, unique password',
      'Check "Remember me" for persistent sessions',
      'Contact support if login issues persist'
    ]
  },
  'Sign Up': {
    description: 'The Sign Up screen allows new users to register for the Civil QC Application with email verification and account creation.',
    functionalities: [
      'New user registration',
      'Email verification process',
      'Password strength validation',
      'Terms and conditions acceptance',
      'Account activation workflow'
    ],
    navigation: 'Accessible from sign-in screen or direct URL. Redirects to email verification after registration.',
    interactions: [
      'Fill in all required fields',
      'Accept terms and conditions',
      'Click "Sign Up" to create account',
      'Check email for verification link'
    ],
    tips: [
      'Use a valid email address for verification',
      'Create a strong password (8+ characters)',
      'Read terms and conditions carefully'
    ]
  },
  'Forgot Password': {
    description: 'Password recovery screen that sends reset instructions to the user\'s registered email address.',
    functionalities: [
      'Password reset email sending',
      'Email validation',
      'Security token generation',
      'Reset link expiration handling'
    ],
    navigation: 'Accessible from sign-in screen. Returns to sign-in after email submission.',
    interactions: [
      'Enter registered email address',
      'Click "Reset Password" button',
      'Check email for reset instructions',
      'Follow reset link in email'
    ],
    tips: [
      'Use the email address associated with your account',
      'Check spam folder if email doesn\'t arrive',
      'Reset links expire after 24 hours'
    ]
  },
  'Dashboard': {
    description: 'Main dashboard providing quick access to core application features and project overview.',
    functionalities: [
      'Project creation and management',
      'Quick action cards',
      'User profile display',
      'Theme and language switching',
      'Logout functionality'
    ],
    navigation: 'Default authenticated landing page. Cards link to respective sections.',
    interactions: [
      'Click "Create New Project" to start project setup',
      'Click "My Projects" to view project list',
      'Use theme toggle for dark/light mode',
      'Select language from dropdown',
      'Click logout to sign out'
    ],
    tips: [
      'Use dashboard cards for quick navigation',
      'Switch themes based on lighting conditions',
      'Language settings persist across sessions'
    ]
  },
  'My Projects': {
    description: 'Comprehensive project listing with filtering, sorting, and management capabilities.',
    functionalities: [
      'Project listing with pagination',
      'Search and filter functionality',
      'Project status indicators',
      'Bulk operations support',
      'Export capabilities'
    ],
    navigation: 'Accessible from dashboard. Individual projects link to detail views.',
    interactions: [
      'Use search bar to find projects',
      'Apply filters by status or date',
      'Click project cards for details',
      'Use action menus for project operations'
    ],
    tips: [
      'Use filters to quickly find specific projects',
      'Project status colors indicate completion level',
      'Regularly review project statuses'
    ]
  },
  'Project Information': {
    description: 'Project creation and information management screen with comprehensive form fields.',
    functionalities: [
      'Project basic information entry',
      'Form validation and saving',
      'Auto-save functionality',
      'Progress tracking',
      'Data persistence'
    ],
    navigation: 'Accessed when creating new projects. Part of multi-step project setup.',
    interactions: [
      'Fill in project details',
      'Navigate between form sections',
      'Save progress at any time',
      'Continue to next setup steps'
    ],
    tips: [
      'Complete all required fields for full functionality',
      'Use descriptive project names',
      'Save frequently to avoid data loss'
    ]
  },
  'Project Actions': {
    description: 'Project management interface providing access to all project-related operations.',
    functionalities: [
      'Project editing and deletion',
      'Navigation to project modules',
      'Status updates',
      'Project sharing options',
      'Activity logging'
    ],
    navigation: 'Central hub for project operations. Links to excavation, basics, and other modules.',
    interactions: [
      'Select actions from menu',
      'Navigate to specific project screens',
      'Update project information',
      'Manage project permissions'
    ],
    tips: [
      'Review all options before making changes',
      'Use breadcrumbs for navigation context',
      'Changes are saved automatically'
    ]
  },
  'Excavation Screen': {
    description: 'Specialized screen for excavation quality control with measurement tracking and documentation.',
    functionalities: [
      'Excavation depth measurements',
      'Soil type classification',
      'Compaction test results',
      'Photo documentation upload',
      'Real-time validation',
      'Quality checkpoints'
    ],
    navigation: 'Accessed from project actions. Part of quality control workflow.',
    interactions: [
      'Enter measurement data',
      'Select soil classifications',
      'Upload supporting photos',
      'Complete quality checkpoints',
      'Save and validate entries'
    ],
    tips: [
      'Take clear, well-lit photos',
      'Double-check measurements before saving',
      'Complete all required checkpoints'
    ]
  },
  'Basics Screen': {
    description: 'Fundamental project setup screen for basic configuration and initial parameters.',
    functionalities: [
      'Basic project configuration',
      'Initial parameter setup',
      'Foundation settings',
      'Standard compliance checks',
      'Setup validation'
    ],
    navigation: 'Early step in project creation. Leads to specialized screens.',
    interactions: [
      'Configure basic project settings',
      'Set initial parameters',
      'Validate setup requirements',
      'Proceed to detailed configurations'
    ],
    tips: [
      'Review all settings carefully',
      'Ensure compliance with standards',
      'Save progress before leaving'
    ]
  },
  'White Concrete Screen': {
    description: 'Specialized quality control screen for white concrete mixing and curing processes.',
    functionalities: [
      'Concrete mix specifications',
      'Strength testing results',
      'Temperature monitoring',
      'Curing conditions tracking',
      'Quality checkpoints',
      'Documentation requirements'
    ],
    navigation: 'Accessed from basics screen. Specialized concrete quality control.',
    interactions: [
      'Enter mix specifications',
      'Record test results',
      'Monitor temperature readings',
      'Document curing conditions',
      'Complete quality assessments'
    ],
    tips: [
      'Monitor temperature continuously',
      'Record all test results accurately',
      'Follow curing protocols strictly'
    ]
  },
  'Home Screen': {
    description: 'Project home screen showing summary information and recent activities.',
    functionalities: [
      'Project summary display',
      'Recent activity feed',
      'Quick access links',
      'Status overview',
      'Navigation shortcuts'
    ],
    navigation: 'Project-specific home page. Provides overview and quick actions.',
    interactions: [
      'Review project summary',
      'Access recent activities',
      'Use quick navigation links',
      'Monitor project status'
    ],
    tips: [
      'Check activity feed regularly',
      'Use shortcuts for frequent tasks',
      'Monitor status indicators'
    ]
  }
};

function generateHTMLDocumentation() {
  const metadataPath = path.join(__dirname, '..', 'screenshots', 'metadata.json');
  const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf-8'));

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Civil QC Application - UI Documentation</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f5f5f5;
        }
        .header {
            text-align: center;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 40px 20px;
            border-radius: 10px;
            margin-bottom: 30px;
        }
        .toc {
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            margin-bottom: 30px;
        }
        .toc h2 {
            color: #667eea;
            border-bottom: 2px solid #667eea;
            padding-bottom: 10px;
        }
        .toc ul {
            list-style: none;
            padding: 0;
        }
        .toc li {
            margin: 8px 0;
        }
        .toc a {
            color: #667eea;
            text-decoration: none;
            font-weight: 500;
        }
        .toc a:hover {
            text-decoration: underline;
        }
        .screen-section {
            background: white;
            margin-bottom: 40px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            overflow: hidden;
        }
        .screen-header {
            background: #667eea;
            color: white;
            padding: 20px;
            font-size: 1.5em;
            font-weight: bold;
        }
        .screen-content {
            padding: 20px;
        }
        .screenshot {
            text-align: center;
            margin: 20px 0;
            border: 1px solid #ddd;
            border-radius: 8px;
            overflow: hidden;
            background: #f9f9f9;
        }
        .screenshot img {
            max-width: 100%;
            height: auto;
            display: block;
        }
        .description {
            background: #f8f9fa;
            padding: 15px;
            border-radius: 6px;
            margin: 15px 0;
            border-left: 4px solid #667eea;
        }
        .functionality-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
            margin: 20px 0;
        }
        .functionality-item {
            background: #e3f2fd;
            padding: 15px;
            border-radius: 6px;
            border-left: 4px solid #2196f3;
        }
        .interaction-list, .tips-list {
            background: #fff3e0;
            padding: 15px;
            border-radius: 6px;
            margin: 15px 0;
            border-left: 4px solid #ff9800;
        }
        .interaction-list ul, .tips-list ul {
            margin: 0;
            padding-left: 20px;
        }
        .navigation-info {
            background: #e8f5e8;
            padding: 15px;
            border-radius: 6px;
            margin: 15px 0;
            border-left: 4px solid #4caf50;
        }
        .footer {
            text-align: center;
            margin-top: 40px;
            padding: 20px;
            background: #333;
            color: white;
            border-radius: 8px;
        }
        h3 {
            color: #667eea;
            margin-top: 25px;
            margin-bottom: 10px;
        }
        @media print {
            body { background: white; }
            .screen-section { page-break-inside: avoid; }
            .screenshot img { max-height: 400px; }
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>Civil QC Application</h1>
        <h2>UI Documentation Guide</h2>
        <p>Comprehensive guide to application screens, functionalities, and user interactions</p>
        <p><strong>Generated:</strong> ${new Date().toLocaleString()}</p>
    </div>

    <div class="toc">
        <h2>Table of Contents</h2>
        <ul>
            ${metadata.map((screen, index) => `<li><a href="#screen-${index}">${screen.name}</a></li>`).join('')}
        </ul>
    </div>

    ${metadata.map((screen, index) => {
        const details = screenDetails[screen.name] || {};
        return `
    <div class="screen-section" id="screen-${index}">
        <div class="screen-header">
            ${screen.name}
        </div>
        <div class="screen-content">
            <div class="description">
                <strong>Description:</strong> ${details.description || screen.description}
            </div>

            <div class="screenshot">
                <img src="screenshots/${screen.name.replace(/\s+/g, '_').toLowerCase()}.png" alt="${screen.name} Screenshot" />
                ${screen.note ? `<p style="color: #666; font-style: italic; margin-top: 10px;">Note: ${screen.note}</p>` : ''}
            </div>

            <h3>Navigation</h3>
            <div class="navigation-info">
                ${details.navigation || 'Standard navigation available'}
            </div>

            <h3>Key Functionalities</h3>
            <div class="functionality-grid">
                ${(details.functionalities || []).map(func => `
                    <div class="functionality-item">${func}</div>
                `).join('')}
            </div>

            <h3>User Interactions</h3>
            <div class="interaction-list">
                <ul>
                    ${(details.interactions || []).map(interaction => `<li>${interaction}</li>`).join('')}
                </ul>
            </div>

            <h3>Usability Tips</h3>
            <div class="tips-list">
                <ul>
                    ${(details.tips || []).map(tip => `<li>${tip}</li>`).join('')}
                </ul>
            </div>
        </div>
    </div>
        `;
    }).join('')}

    <div class="footer">
        <p>&copy; 2025 Civil QC Application - UI Documentation</p>
        <p>For technical support, contact: support@civilqc.com</p>
    </div>
</body>
</html>`;

  const outputPath = path.join(__dirname, '..', 'Civil_QC_UI_Documentation.html');
  fs.writeFileSync(outputPath, html);
  console.log(`✓ HTML documentation generated: ${outputPath}`);
}

generateHTMLDocumentation();