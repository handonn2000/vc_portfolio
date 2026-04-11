from PIL import Image

def rgb_to_ansi(r, g, b):
    # Use 24-bit ANSI escape codes to print exact colors
    return f"\033[48;2;{r};{g};{b}m  \033[0m"

img = Image.open('/Users/handonn/.gemini/antigravity/brain/2e631a35-cdae-43ff-aa19-d3466f73d113/media__1775900701282.png').convert('RGB')
img.thumbnail((40, 40), Image.NEAREST)  # NEAREST to maintain pixel art
w, h = img.size

for y in range(h):
    row = ""
    for x in range(w):
        r, g, b = img.getpixel((x, y))
        row += rgb_to_ansi(r, g, b)
    print(row)
