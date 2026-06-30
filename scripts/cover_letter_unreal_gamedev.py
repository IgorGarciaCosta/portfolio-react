"""Generates a brief cover letter DOCX for the Senior Unreal Engine Engineer (Switch) role."""
from docx import Document
from docx.shared import Pt

OUTPUT = r"C:\Users\ISILV125\Downloads\05_Pessoal\Curriculum\CurriculumRelated\IgorGarcia_CoverLetter-Unreal-Console.docx"

paragraphs = [
    "Igor Garcia",
    "Senior Unreal Engine Engineer | C++ / Console | +55 (75) 99982-3805 | igonildo7@gmail.com",
    "",
    "Dear Hiring Team,",
    "",
    "I'm excited to apply for the Senior Unreal Engine Engineer (Switch) position. I'm a C++ / "
    "Unreal Engine engineer with 5 years of professional experience building high-performance "
    "real-time systems, and I'm based in Brazil and fully set up for remote work.",
    "",
    "My background maps closely to this role. I work daily in C++ with a focus on profiling and "
    "resolving CPU/GPU and memory bottlenecks across multiple hardware targets, and I shipped a "
    "console title (SkateNation XL) to PlayStation 5 and Xbox Series X|S, including multiplayer "
    "network replication and low-latency input. I've also authored two published Unreal "
    "Marketplace C++ plugins — one featuring a fully asynchronous GPU-to-CPU readback pipeline "
    "with version-conditional support across UE 4.27-5.6 — so I'm comfortable at the engine "
    "level and writing robust, maintainable, shippable code.",
    "",
    "On Nintendo Switch specifically, I haven't shipped a commercial title yet, but I'm actively "
    "developing and testing personal projects on the hardware, so I'm already hands-on with its "
    "constraints. Combined with my experience optimizing for lower-end and constrained targets, "
    "cross-functional collaboration with art, design and production, and technical leadership, "
    "I'm confident I can contribute quickly to your console porting and optimization efforts.",
    "",
    "I'd welcome the chance to discuss how I can help deliver polished, high-performance "
    "experiences across platforms. Thank you for your consideration.",
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
