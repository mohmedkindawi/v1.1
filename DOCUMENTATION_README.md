# Civil QC App Documentation

## Overview
The Civil QC App is a modern web application designed for civil engineering quality control workflows. It provides project management, authentication, multi-language support (English/Arabic), dark mode, RTL/LTR layout switching, and animated user experiences.

## Features
- User authentication (Firebase)
- Project management dashboard
- Multi-language support (English, Arabic)
- RTL/LTR layout switching
- Dark mode toggle
- Animated route transitions and UI elements
- Responsive design for desktop and mobile

## Technologies Used
- React 18 + TypeScript
- Vite (build tool)
- Tailwind CSS (with dark mode and RTL plugin)
- Zustand (state management)
- i18next & react-i18next (internationalization)
- Framer Motion (animations)
- Firebase (authentication)

## Getting Started

### Prerequisites
- Node.js (v18 or newer recommended)
- npm (comes with Node.js)

### Installation
1. Clone the repository:
  ```sh
  git clone <your-repo-url>
  cd <project-folder>
  ```
2. Install dependencies:
  ```sh
  npm install
  ```

### Development
To start the development server:
```sh
npm run dev
```
The app will be available at `http://localhost:5173`.

### Production Build & Preview
To build and preview the production version:
```sh
npm run build
npm run preview
```
The preview will be available at `http://127.0.0.1:4173`.

## Project Structure
```
src/
  App.tsx                # Main app component and routing
  main.tsx               # App entry point
  index.css              # Global styles (Tailwind)
  components/
   auth/                # Authentication forms
   project/             # Project-related screens
   ui/                  # Reusable UI components
  lib/
   firebase.ts          # Firebase config
   store.ts             # Zustand store
   types.ts             # TypeScript types
  locales/               # i18n translation files
  i18n.ts                # i18next configuration
```

## Customization
- **Languages**: Add new translation keys in `src/locales/en.json` and `src/locales/ar.json`.
- **Dark Mode**: Toggle using the ThemeToggle component in the header.
- **RTL/LTR**: Automatically switches based on selected language.
- **Animations**: Customize in `AnimatedLayout` and `PageWrapper` components.

## Contributing
1. Fork the repository
2. Create a new branch for your feature/fix
3. Commit your changes
4. Open a pull request

## License
This project is licensed under the MIT License.

## Contact
For questions or support, contact the project owner or open an issue on GitHub.

If you have one of these tools installed, you can generate PDF directly:

#### Using wkhtmltopdf
```bash
wkhtmltopdf --enable-local-file-access --print-media-type \
  Civil_QC_Application_Documentation.html \
  Civil_QC_Application_Documentation.pdf
```

#### Using WeasyPrint (Python)
```bash
# Install (if needed)
pip install weasyprint

# Convert
weasyprint Civil_QC_Application_Documentation.html \
  Civil_QC_Application_Documentation.pdf
```

#### Using Headless Chrome/Chromium
```bash
# Chrome
google-chrome --headless --disable-gpu \
  --print-to-pdf=Civil_QC_Application_Documentation.pdf \
  Civil_QC_Application_Documentation.html

# Chromium
chromium --headless --disable-gpu \
  --print-to-pdf=Civil_QC_Application_Documentation.pdf \
  Civil_QC_Application_Documentation.html
```

### Method 3: Using Node.js Script

Generate the HTML documentation using the provided script:

```bash
npm run generate-docs
```

This will create the HTML file ready for conversion.

## Documentation Structure

The comprehensive documentation includes:

### 📋 Overview Sections
- Executive Summary
- Problem Statement
- Solution Overview

### 🎯 Features & Functionality
- Authentication System
- Project Management
- Quality Control Modules (Excavation, Backfilling, Foundation)
- Interactive Checklist System
- Export and Documentation

### 💻 Technical Details
- Frontend Technology Stack
- Backend & Services
- Development Tools
- Design System & Color Palette
- Component Architecture
- State Management

### 🏗️ Architecture & Implementation
- Project Structure
- Component Architecture
- Routing Strategy
- State Management Strategy

### 📊 Business & Impact
- Security & Data Protection
- Performance Optimizations
- Responsive Design
- Scalability Considerations
- Business Impact Analysis

### 🚀 Future & Planning
- Testing Strategy
- Deployment & DevOps
- Future Roadmap (Phases 1-4)
- Competitive Analysis

### 📚 Lessons Learned
- Technical Insights
- UX Insights
- Business Insights

### 📖 Appendices
- Technology Documentation Links
- Design Resources
- Development Guidelines

## Recommended PDF Settings for Best Results

For optimal PDF output:

- **Paper Size:** A4 (210 × 297 mm) or Letter (8.5 × 11 in)
- **Orientation:** Portrait
- **Margins:**
  - Top: 2cm / 0.75in
  - Bottom: 2cm / 0.75in
  - Left: 2cm / 0.75in
  - Right: 2cm / 0.75in
- **Scale:** 90-100% (depending on your screen resolution)
- **Background Graphics:** Enabled (for colors and styling)
- **Headers/Footers:** Optional
- **Color:** Color (not grayscale)

## File Locations

After generation, you'll have these files:

```
project-root/
├── CASE_STUDY.md                                    # Original markdown
├── Civil_QC_Application_Documentation.html          # Formatted HTML
├── Civil_QC_Application_Documentation.pdf           # Final PDF (after conversion)
├── DOCUMENTATION_README.md                          # This guide
└── scripts/
    ├── generate-docs.js                             # Node.js generator
    └── generate_pdf.py                              # Python generator
```

## Troubleshooting

### Issue: Colors not showing in PDF
**Solution:** Enable "Background graphics" in print settings

### Issue: Content is cut off
**Solution:**
- Reduce scale to 90% or 85%
- Check margins are not too large
- Try different paper size (A4 vs Letter)

### Issue: Fonts look different
**Solution:**
- Ensure internet connection (fonts loaded from Google Fonts)
- Wait for page to fully load before printing
- Use a modern browser (Chrome, Firefox, Edge)

### Issue: Links not clickable in PDF
**Solution:** This is normal - most browser PDF exports create links as clickable

### Issue: Page breaks in wrong places
**Solution:**
- This is handled automatically with CSS
- Some browsers handle page breaks better (try Chrome)
- Manual adjustment may be needed for specific content

## Quality Assurance Checklist

Before finalizing your PDF, check:

- [ ] All sections are visible and readable
- [ ] Colors and styling are preserved
- [ ] Code blocks are formatted correctly
- [ ] Headers and hierarchy are clear
- [ ] Tables (if any) are not cut off
- [ ] Page numbers display (if enabled)
- [ ] File size is reasonable (should be 2-5 MB)
- [ ] PDF opens correctly in different PDF readers

## Sharing & Distribution

The generated PDF is ready for:

- ✓ Stakeholder presentations
- ✓ Portfolio demonstrations
- ✓ Client proposals
- ✓ Team documentation
- ✓ Project archives
- ✓ Technical reviews
- ✓ Knowledge base contributions

## Need Help?

If you encounter issues:

1. Try a different browser (Chrome recommended)
2. Clear browser cache and reload HTML
3. Check that the HTML file is complete (should be ~30KB)
4. Verify internet connection (for fonts and styling)
5. Try different PDF generation methods listed above

---

**Document Version:** 1.0
**Last Updated:** October 2025
**Maintained By:** Civil QC Development Team
