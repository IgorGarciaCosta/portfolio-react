import { ProjectCard } from "@/components/ProjectCard";

const PROJECTS = [
  {
    title: "Realtime mesh Exporter",
    description:
      "Interactive Unreal Engine application used at Ford to validate interior ergonomics and reduce physical mock-up cost.",
    videoSrc: "https://www.youtube.com/embed/rJmea9DGjjo",
  },
  {
    title: "OpenAI UE5 integration Plugin",
    description:
      "Implemented core skating mechanics, responsive UI for gamepad / keyboard and network optimisation for smooth online sessions.",
    videoSrc: "https://www.youtube.com/embed/SM36E1veQto",
  },
  {
    title: "VR bedroom simulation",
    description:
      "Interactive Unreal Engine application used at Ford to validate interior ergonomics and reduce physical mock-up cost.",
    videoSrc: "https://www.youtube.com/embed/VUssMq4qAyk",
  },
  {
    title: "Platform 2D game",
    description:
      "Implemented core skating mechanics, responsive UI for gamepad / keyboard and network optimisation for smooth online sessions.",
    videoSrc: "https://www.youtube.com/embed/HTJ7bF0yzVs",
  },
  {
    title: "Laser launcher robot",
    description:
      "Interactive Unreal Engine application used at Ford to validate interior ergonomics and reduce physical mock-up cost.",
    videoSrc: "https://www.youtube.com/embed/Qf3frW3jAWk",
  },
  {
    title: "Skateboarding prototype",
    description:
      "Implemented core skating mechanics, responsive UI for gamepad / keyboard and network optimisation for smooth online sessions.",
    videoSrc: "https://www.youtube.com/embed/CL3kiYauUl0",
  },
  // add more projects here …
];

export default function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-4xl space-y-10">
      <h2 className="mb-8 text-3xl font-bold">Highlight Projects</h2>

      {PROJECTS.map((p) => (
        <ProjectCard
          key={p.title}
          title={p.title}
          description={p.description}
          videoSrc={p.videoSrc}
        />
      ))}
    </section>
  );
}
