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

    try:
        import markdown
        import mdx_math
    except ImportError:
        os.system('pip install markdown python-markdown-math')
        import markdown
        import mdx_math

    # Read markdown
    try:
        with open(markdown_file, 'r', encoding='utf-8') as f:
            markdown_content = f.read()
    except FileNotFoundError:
        print(f"Error: Could not find {markdown_file}")
        sys.exit(1)

    # Convert to HTML
    md = markdown.Markdown(extensions=['fenced_code', 'tables', 'mdx_math'])
    html_content = md.convert(markdown_content)

    # HTML template
    html_template = f"""<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Civil QC Application Documentation</title>
    <style>
        body {{ font-family: Arial, sans-serif; line-height: 1.6; max-width: 1200px; margin: 0 auto; padding: 20px; }}
        h1 {{ color: #333; }}
        h2 {{ color: #444; border-bottom: 1px solid #ddd; }}
        code {{ background: #f4f4f4; padding: 2px 4px; }}
        pre {{ background: #f4f4f4; padding: 10px; overflow-x: auto; }}
        table {{ border-collapse: collapse; width: 100%; }}
        th, td {{ border: 1px solid #ddd; padding: 8px; }}
        th {{ background-color: #f4f4f4; }}
    </style>
</head>
<body>
    {html_content}
</body>
</html>"""

    # Write HTML
    with open(html_output, 'w', encoding='utf-8') as f:
        f.write(html_template)

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