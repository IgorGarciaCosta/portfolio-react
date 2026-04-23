import {
  SiJavascript,
  SiTypescript,
  SiReact,
  SiTailwindcss,
  SiCss3,
  SiHtml5,
  SiCplusplus,
  SiSharp,
  SiPython,
  SiNodedotjs,
  SiDotnet,
  SiPostgresql,
  SiSqlite,
  SiFirebase,
  SiDocker,
  SiGit,
  SiUnrealengine,
  SiUnity,
  SiGithub,
  SiGithubactions,
  SiFigma,
  SiJirasoftware,
  SiNpm,
  SiVite,
  SiAmazonwebservices,
  SiOracle,
} from "react-icons/si";
import { FaDatabase } from "react-icons/fa";

export interface Skill {
  icon: React.ReactNode;
  label: string;
}

export interface LearningItem {
  icon: React.ReactNode;
  label: string;
  desc: string;
}

export const frontend: Skill[] = [
  { icon: <SiJavascript />, label: "JavaScript" },
  { icon: <SiTypescript />, label: "TypeScript" },
  { icon: <SiReact />, label: "React" },
  { icon: <SiTailwindcss />, label: "Tailwind CSS" },
  { icon: <SiCss3 />, label: "CSS3" },
  { icon: <SiHtml5 />, label: "HTML5" },
];

export const backend: Skill[] = [
  { icon: <SiSharp />, label: "C#" },
  { icon: <SiCplusplus />, label: "C++" },
  { icon: <SiPython />, label: "Python" },
  { icon: <SiDotnet />, label: "ASP.NET Core" },
  { icon: <SiNodedotjs />, label: "Node.js" },
  { icon: <FaDatabase />, label: "SQL" },
  { icon: <SiPostgresql />, label: "PostgreSQL" },
  { icon: <SiSqlite />, label: "SQLite" },
  { icon: <SiFirebase />, label: "Firebase" },
  { icon: <SiDocker />, label: "Docker" },
];

export const tools: Skill[] = [
  { icon: <SiGit />, label: "Git" },
  { icon: <SiGithub />, label: "GitHub" },
  { icon: <SiGithubactions />, label: "GitHub Actions" },
  { icon: <SiVite />, label: "Vite" },
  { icon: <SiNpm />, label: "NPM" },
  { icon: <SiFigma />, label: "Figma" },
  { icon: <SiJirasoftware />, label: "Jira" },
  { icon: <SiUnrealengine />, label: "Unreal Engine" },
  { icon: <SiUnity />, label: "Unity" },
];

export const currentlyLearning: LearningItem[] = [
  {
    icon: <SiAmazonwebservices />,
    label: "AWS",
    desc: "Lambda, API Gateway, DynamoDB, SQS & CloudWatch",
  },
  {
    icon: <SiOracle />,
    label: "Oracle Cloud",
    desc: "OCI infrastructure & cloud deployments",
  },
];
