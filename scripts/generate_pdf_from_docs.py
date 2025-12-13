#!/usr/bin/env python3
"""
Generate PDF from PROJECT_DOCUMENTATION.md using HTML as intermediate format
"""
import os
import sys
import re
from pathlib import Path

def markdown_to_html(markdown_text):
    """Convert markdown to HTML with basic formatting"""
    html = markdown_text

    # Headers
    html = re.sub(r'^### (.+)$', r'<h3>\1</h3>', html, flags=re.MULTILINE)
    html = re.sub(r'^## (.+)$', r'<h2>\1</h2>', html, flags=re.MULTILINE)
    html = re.sub(r'^# (.+)$', r'<h1>\1</h1>', html, flags=re.MULTILINE)

    # Bold
    html = re.sub(r'\*\*(.+?)\*\*', r'<strong>\1</strong>', html)

    # Code blocks
    html = re.sub(r'```(\w+)?\n(.*?)```', r'<pre><code>\2</code></pre>', html, flags=re.DOTALL)
    html = re.sub(r'`([^`]+)`', r'<code>\1</code>', html)

    # Links
    html = re.sub(r'\[([^\]]+)\]\(([^)]+)\)', r'<a href="\2">\1</a>', html)

    # Horizontal rules
    html = re.sub(r'^---$', r'<hr/>', html, flags=re.MULTILINE)

    # Lists - unordered
    lines = html.split('\n')
    in_list = False
    result_lines = []

    for line in lines:
        if line.strip().startswith('- '):
            if not in_list:
                result_lines.append('<ul>')
                in_list = True
            result_lines.append(f'<li>{line.strip()[2:]}</li>')
        elif line.strip().startswith(tuple(f'{i}. ' for i in range(10))):
            if not in_list:
                result_lines.append('<ol>')
                in_list = 'ol'
            content = re.sub(r'^\d+\. ', '', line.strip())
            result_lines.append(f'<li>{content}</li>')
        else:
            if in_list:
                result_lines.append('</ol>' if in_list == 'ol' else '</ul>')
                in_list = False
            result_lines.append(line)

    if in_list:
        result_lines.append('</ol>' if in_list == 'ol' else '</ul>')

    html = '\n'.join(result_lines)

    # Paragraphs
    paragraphs = html.split('\n\n')
    formatted_paragraphs = []

    for para in paragraphs:
        para = para.strip()
        if para and not para.startswith('<'):
            formatted_paragraphs.append(f'<p>{para}</p>')
        else:
            formatted_paragraphs.append(para)

    html = '\n'.join(formatted_paragraphs)

    # Checkboxes
    html = html.replace('✅', '<span style="color: #5bbfb5; font-weight: bold;">✓</span>')

    return html

def create_html_document(content):
    """Wrap content in full HTML document with styles"""
    return f'''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Civil QC Application - Comprehensive Documentation</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Merriweather:wght@400;700&display=swap');

        * {{
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }}

        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            line-height: 1.8;
            color: #1a1b37;
            background: #ffffff;
            padding: 40px 60px;
            max-width: 1200px;
            margin: 0 auto;
            font-size: 11pt;
            counter-reset: section;
        }
        
        .document-meta {
            text-align: right;
            margin-bottom: 40px;
            font-size: 10pt;
            color: #666;
        }
        
        .confidential {
            position: fixed;
            top: 10px;
            right: 10px;
            font-size: 9pt;
            color: #999;
            transform: rotate(45deg);
        }

        @media print {{
            body {{
                padding: 20px;
            }}

            h1, h2, h3 {{
                page-break-after: avoid;
            }}

            pre, table, ul, ol {{
                page-break-inside: avoid;
            }}
        }}

        @page {{
            size: A4;
            margin: 2cm;
        }}

        h1 {
            font-family: 'Merriweather', serif;
            color: #1a1b37;
            font-size: 28pt;
            font-weight: 700;
            margin-bottom: 20px;
            padding-bottom: 10px;
            border-bottom: 4px solid #5bbfb5;
            page-break-before: always;
            text-align: center;
        }
        
        h1::before {
            display: none;
        }
        
        h2::before {
            counter-increment: section;
            content: counter(section) ". ";
            color: #5bbfb5;
            font-weight: 700;
        }

        h2 {{
            color: #1a1b37;
            font-size: 20pt;
            font-weight: 600;
            margin-top: 40px;
            margin-bottom: 15px;
            padding-bottom: 8px;
            border-bottom: 2px solid #5bbfb5;
        }}

        h3 {{
            color: #2c3e50;
            font-size: 16pt;
            font-weight: 600;
            margin-top: 30px;
            margin-bottom: 12px;
        }}

        p {{
            margin-bottom: 15px;
            text-align: justify;
            line-height: 1.8;
        }}

        ul, ol {{
            margin-left: 30px;
            margin-bottom: 15px;
        }}

        li {{
            margin-bottom: 8px;
            line-height: 1.6;
        }}

        code {{
            background: #f5f5f5;
            padding: 3px 6px;
            border-radius: 4px;
            font-family: 'Monaco', 'Consolas', monospace;
            font-size: 0.9em;
            color: #d63384;
        }}

        pre {{
            background: #2d2d2d;
            color: #f8f8f2;
            padding: 20px;
            border-radius: 8px;
            overflow-x: auto;
            margin-bottom: 20px;
            line-height: 1.5;
        }}

        pre code {{
            background: transparent;
            color: inherit;
            padding: 0;
            font-size: 9pt;
        }}

        a {{
            color: #5bbfb5;
            text-decoration: none;
            font-weight: 500;
        }}

        hr {{
            border: none;
            border-top: 2px solid #e0e0e0;
            margin: 30px 0;
        }}

        strong {{
            font-weight: 600;
            color: #1a1b37;
        }}

        .header-info {{
            background: linear-gradient(135deg, #5bbfb5 0%, #4a9d95 100%);
            color: white;
            padding: 40px;
            border-radius: 12px;
            margin-bottom: 30px;
            text-align: center;
        }}

        .header-info h1 {{
            color: white;
            border-bottom: none;
            margin-bottom: 10px;
        }}

        .header-info p {{
            font-size: 14pt;
            opacity: 0.95;
        }}

        .metadata {{
            background: #fff6e9;
            padding: 25px;
            border-radius: 8px;
            border-left: 6px solid #5bbfb5;
            margin-bottom: 30px;
        }}

        .metadata p {{
            margin-bottom: 8px;
        }}

        footer {{
            text-align: center;
            color: #777;
            margin-top: 50px;
            padding-top: 30px;
            border-top: 2px solid #e0e0e0;
        }}
    </style>
</head>
<body>
    <div class="confidential">CONFIDENTIAL</div>
    
    <div class="header-info">
        <h1>Civil QC Application</h1>
        <p>Comprehensive Project Documentation</p>
    </div>

    <div class="metadata">
        <p><strong>Document Classification:</strong> Internal Use Only</p>
        <p><strong>Document Type:</strong> Technical & Business Documentation</p>
        <p><strong>Project Name:</strong> Civil Quality Control Application</p>
        <p><strong>Version:</strong> 1.0</p>
        <p><strong>Last Updated:</strong> November 2025</p>
        <p><strong>Status:</strong> Production Ready</p>
        <p><strong>Prepared For:</strong> Project Supervision Team</p>
        <p><strong>Prepared By:</strong> Development Team</p>
    </div>

    <div class="document-meta">
        <p>Document ID: CQC-DOC-2025-001</p>
        <p>Revision: 1.0.0</p>
    </div>

    {content}

    <hr>
    <footer>
        <p><strong>Civil QC Application</strong> - Comprehensive Project Documentation</p>
        <p>© 2025 Civil QC Development Team | Version 1.0</p>
    </footer>
</body>
</html>'''

def main():
    # Get paths
    script_dir = Path(__file__).parent
    project_dir = script_dir.parent
    markdown_file = project_dir / 'PROJECT_DOCUMENTATION.md'
    html_output = project_dir / 'Civil_QC_Application_Documentation.html'

    # Read markdown
    try:
        with open(markdown_file, 'r', encoding='utf-8') as f:
            markdown_content = f.read()
    except FileNotFoundError:
        print(f"Error: Could not find {markdown_file}")
        sys.exit(1)

    # Convert to HTML
    html_content = markdown_to_html(markdown_content)
    full_html = create_html_document(html_content)

    # Write HTML
    with open(html_output, 'w', encoding='utf-8') as f:
        f.write(full_html)

    print(f"✓ HTML documentation generated: {html_output}")
    print("\nTo convert to PDF:")
    print("1. Open the HTML file in your browser")
    print("2. Press Ctrl+P (Cmd+P on Mac)")
    print("3. Select 'Save as PDF'")
    print("4. Recommended settings:")
    print("   - Paper size: A4")
    print("   - Margins: Default")
    print("   - Scale: 100%")
    print("   - Background graphics: On")
    print("5. Save the PDF")

    # Try to open in browser automatically
    import webbrowser
    try:
        webbrowser.open(f'file://{html_output}')
        print(f"\n✓ Opening browser automatically...")
    except:
        print(f"\n→ Open manually: file://{html_output}")

if __name__ == '__main__':
    main()