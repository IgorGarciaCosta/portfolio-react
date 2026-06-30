"""Generates a brief cover letter DOCX for the Backend Software Engineer C# (Techifide) role."""
from docx import Document
from docx.shared import Pt

OUTPUT = r"C:\Users\ISILV125\Downloads\05_Pessoal\Curriculum\CurriculumRelated\IgorGarcia_CoverLetter-Backend-CSharp.docx"

paragraphs = [
    "Igor Garcia",
    "Backend Software Engineer | C# / .NET | +55 (75) 99982-3805 | igonildo7@gmail.com",
    "",
    "Dear Techifide Hiring Team,",
    "",
    "I'm excited to apply for the Backend Software Engineer (C#) position. I'm a backend "
    "engineer with 4+ years of experience designing and shipping production services in C# / "
    ".NET, and I'm based in Brazil and fully set up for remote work.",
    "",
    "Much of my recent work maps directly to what you're building. I've designed clean-"
    "architecture .NET 9 APIs, integrated external services with resilient handling of auth "
    "flows, rate limits and retries, and persisted data with Entity Framework Core and "
    "PostgreSQL — including schema design and query optimization for data-heavy use cases. "
    "I've also built asynchronous, distributed systems (background workers, network "
    "synchronization, message-queue patterns) and deployed them on AWS and Docker with a focus "
    "on performance, reliability and observability.",
    "",
    "What makes me a strong fit beyond the core backend stack is my graphics and 3D background. "
    "I've authored C++ tooling for Unreal Engine (spline-based measurement, runtime mesh "
    "exporting, real-time occlusion/computer-vision algorithms) and worked extensively with "
    "real-time, low-latency systems. Given your domain spans CAD, WebGL/WebGPU and real-time "
    "collaboration, I'd bring both the backend rigor and the 3D/graphics intuition to help the "
    "platform scale.",
    "",
    "I'd welcome the chance to discuss how I can contribute to your team. Thank you for your "
    "consideration.",
    "",
    "Best regards,",
    "Igor Garcia",
]

doc = Document()
style = doc.styles["Normal"]
style.font.name = "Calibri"
style.font.size = Pt(11)

for i, text in enumerate(paragraphs):
    p = doc.add_paragraph(text)
    if i == 0:
        p.runs[0].bold = True
        p.runs[0].font.size = Pt(14)

doc.save(OUTPUT)
print(f"Saved: {OUTPUT}")
