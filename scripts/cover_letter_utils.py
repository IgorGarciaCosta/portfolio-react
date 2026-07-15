"""Shared cover-letter document writer."""
from docx import Document
from docx.shared import Pt


def save_cover_letter(output, paragraphs):
    document = Document()
    style = document.styles["Normal"]
    style.font.name = "Calibri"
    style.font.size = Pt(11)

    for index, text in enumerate(paragraphs):
        paragraph = document.add_paragraph(text)
        if index == 0:
            paragraph.runs[0].bold = True
            paragraph.runs[0].font.size = Pt(14)

    document.save(output)
    print(f"Saved: {output}")
