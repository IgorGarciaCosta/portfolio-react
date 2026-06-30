"""
Generates a clean one-page PDF portfolio cover with a large clickable link to
Igor Garcia's portfolio website, plus contact and key highlights.

This exists because the Monoblue Games application form only accepts
pdf/doc/docx/image files (no .url/.html), so the website is delivered as a
clickable-link PDF.

Output: a single-page A4 PDF placed next to the tailored resumes.
"""
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib.colors import HexColor
from reportlab.pdfgen import canvas

OUTPUT = r"C:\Users\ISILV125\Downloads\05_Pessoal\Curriculum\CurriculumRelated\Resumes\IgorGarcia_Portfolio.pdf"

PORTFOLIO_URL = "https://portfolio-igccs.vercel.app/"

# Optional extra links (leave value empty "" to hide a row)
LINKS = [
    ("Portfolio Website", PORTFOLIO_URL),
    ("GitHub", ""),
    ("LinkedIn", ""),
    ("Unreal Marketplace Plugins", ""),
    ("SkateNation XL (PS5 / Xbox)", ""),
]

NAME = "Igor Garcia"
TAGLINE = "C++ / Unreal Engine 5 Developer"
CONTACT = "+55 (75) 99982-3805  |  igonildo7@gmail.com"

DARK = HexColor("#0f172a")
ACCENT = HexColor("#0ea5e9")
GRAY = HexColor("#475569")
LIGHT = HexColor("#94a3b8")

W, H = A4
c = canvas.Canvas(OUTPUT, pagesize=A4)

# Background
c.setFillColor(HexColor("#ffffff"))
c.rect(0, 0, W, H, fill=1, stroke=0)

# Top accent band
c.setFillColor(DARK)
c.rect(0, H - 70 * mm, W, 70 * mm, fill=1, stroke=0)

# Name
c.setFillColor(HexColor("#ffffff"))
c.setFont("Helvetica-Bold", 30)
c.drawString(25 * mm, H - 32 * mm, NAME)

# Tagline
c.setFillColor(HexColor("#38bdf8"))
c.setFont("Helvetica", 15)
c.drawString(25 * mm, H - 43 * mm, TAGLINE)

# Contact
c.setFillColor(HexColor("#cbd5e1"))
c.setFont("Helvetica", 11)
c.drawString(25 * mm, H - 53 * mm, CONTACT)

# Section title
c.setFillColor(DARK)
c.setFont("Helvetica-Bold", 16)
c.drawString(25 * mm, H - 95 * mm, "Portfolio & Links")

# Big clickable portfolio button
btn_y = H - 120 * mm
btn_h = 16 * mm
btn_w = 160 * mm
btn_x = 25 * mm
c.setFillColor(ACCENT)
c.roundRect(btn_x, btn_y, btn_w, btn_h, 4 * mm, fill=1, stroke=0)
c.setFillColor(HexColor("#ffffff"))
c.setFont("Helvetica-Bold", 14)
c.drawString(btn_x + 8 * mm, btn_y + 5.5 * mm, "Open Portfolio Website  ->  " + PORTFOLIO_URL)
c.linkURL(PORTFOLIO_URL, (btn_x, btn_y, btn_x + btn_w, btn_y + btn_h), relative=0)

# Links list
y = btn_y - 18 * mm
c.setFont("Helvetica", 12)
for label, url in LINKS:
    if not url:
        continue
    c.setFillColor(GRAY)
    c.setFont("Helvetica-Bold", 12)
    c.drawString(25 * mm, y, f"{label}:")
    c.setFillColor(ACCENT)
    c.setFont("Helvetica", 12)
    c.drawString(85 * mm, y, url)
    c.linkURL(url, (85 * mm, y - 2 * mm, 185 * mm, y + 4 * mm), relative=0)
    y -= 9 * mm

# Footer note
c.setFillColor(LIGHT)
c.setFont("Helvetica-Oblique", 10)
c.drawString(25 * mm, 20 * mm,
             "If a link is not clickable in your viewer, copy and paste the URL into your browser.")

c.showPage()
c.save()
print(f"Saved: {OUTPUT}")
