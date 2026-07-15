"""Shared formatting-preserving helpers for the resume generation scripts."""
from docx.oxml.ns import qn


def set_paragraph_text(paragraph, text):
    """Replace paragraph text while preserving the first run's formatting."""
    if not paragraph.runs:
        paragraph.add_run(text)
        return

    paragraph.runs[0].text = text
    for run in paragraph.runs[1:]:
        run.text = ""


def apply_substring(paragraph, old, new):
    """Replace text in its original run, falling back to the first run."""
    for run in paragraph.runs:
        if old in run.text:
            run.text = run.text.replace(old, new)
            return True

    if old not in paragraph.text or not paragraph.runs:
        return False

    set_paragraph_text(paragraph, paragraph.text.replace(old, new))
    return True


def replace_resume_subtitle(paragraph, text):
    """Replace the resume subtitle and preserve its expected LINKS suffix."""
    if paragraph.runs:
        paragraph.runs[0].text = text
        for index, run in enumerate(paragraph.runs[1:], start=1):
            run.text = "\n" if index in (
                4, 5) else "LINKS" if index == 6 else ""

    for hyperlink in paragraph._element.findall(qn("w:hyperlink")):
        for element in hyperlink.findall(qn("w:r")):
            value = element.find(qn("w:t"))
            if value is not None:
                value.text = ""
