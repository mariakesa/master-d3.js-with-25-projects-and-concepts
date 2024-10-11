from bs4 import BeautifulSoup

# Sample HTML content
html_content = '''
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h1>Selecting Elements</h1>

    <svg id="circles" width="300" height="200" x="400" y="400">
        <circle r="30" cx="50" cy="50"></circle>
        <circle r="30" cx="120" cy="120"></circle>
    </svg>
    <svg id="rects" width="300" height="200" x="800" y="800">
        <rect width="100" height="30" x="5" y="5"></rect>
        <rect width="70" height="30" x="50" y="50"></rect>
    </svg>
    <script src="https://cdn.jsdelivr.net/npm/d3@7"></script>
    <script src="select.js"></script>
</body>
</html>
'''

# Parse the HTML content
soup = BeautifulSoup(html_content, 'html.parser')

# Recursive function to generate DOM tree
def generate_dom_tree(node, level=0):
    indent = "  " * level
    print(f"{indent}{node.name if node.name else 'Text'}")

    # Recursively print children
    for child in node.children:
        if hasattr(child, 'children'):
            generate_dom_tree(child, level + 1)

# Generate the DOM tree
generate_dom_tree(soup)