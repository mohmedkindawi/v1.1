#!/usr/bin/env python3
import os
import sys
from pathlib import Path

def main():
    # Get paths
    script_dir = Path(__file__).parent
    project_dir = script_dir.parent
    markdown_file = project_dir / 'PROJECT_DOCUMENTATION.md'
    html_output = project_dir / 'Civil_QC_Application_Documentation.html'

    # Read markdown
    try:
        with open(markdown_file, 'r', encoding='utf-8') as f:
            content = f.read()
    except FileNotFoundError:
        print(f"Error: Could not find {markdown_file}")
        sys.exit(1)

    # Simple HTML template
    html = f"""<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Civil QC Application Documentation</title>
    <style>
        body {{
            font-family: Arial, sans-serif;
            line-height: 1.6;
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
            color: #333;
        }}
        pre {{
            background: #f5f5f5;
            padding: 15px;
            border-radius: 5px;
            overflow-x: auto;
        }}
        code {{
            background: #f5f5f5;
            padding: 2px 4px;
            border-radius: 3px;
        }}
        table {{
            border-collapse: collapse;
            width: 100%;
            margin: 20px 0;
        }}
        th, td {{
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
        }}
        th {{
            background-color: #f5f5f5;
        }}
        img {{
            max-width: 100%;
            height: auto;
        }}
    </style>
</head>
<body>
<pre>{content}</pre>
</body>
</html>"""

    # Write HTML
    with open(html_output, 'w', encoding='utf-8') as f:
        f.write(html)

    print(f"✓ Documentation generated: {html_output}")
    print("\nTo create PDF:")
    print("1. Open the HTML file in your browser")
    print("2. Use browser's print function (Ctrl+P)")
    print("3. Save as PDF")

    # Try to open in browser
    import webbrowser
    try:
        webbrowser.open(f'file://{html_output}')
    except:
        print(f"Please open manually: {html_output}")

if __name__ == '__main__':
    main()