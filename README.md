# Igor Garcia — Developer Portfolio

Personal portfolio built with React, TypeScript, and Vite showcasing my work as a Software Engineer with experience in full-stack applications, real-time 3D experiences, and scalable backend systems.

## Features

- **Single-page scroll layout** with smooth navigation and scroll-aware sticky header
- **Interactive particle background** (tsParticles) with hover/click interactions
- **Typewriter text animation** on the hero section
- **3-card project carousel** with Framer Motion transitions and embedded YouTube videos (11 projects)
- **Dark / Light / System theme** toggle with localStorage persistence and OS preference detection
- **Animated skill icons grid** organized by Frontend, Backend, and Tools
- **Contact form** powered by a Vercel serverless function (Nodemailer)
- **Downloadable CVs** with CSS wipe hover effects
- **Responsive design** with Tailwind CSS

## Tech Stack

| Layer      | Technologies                            |
| ---------- | --------------------------------------- |
| Framework  | React 19, TypeScript 5.8                |
| Build      | Vite 7                                  |
| Styling    | Tailwind CSS 3.4, PostCSS               |
| Animations | Framer Motion, tsParticles              |
| Icons      | react-icons                             |
| Backend    | Vercel Serverless Functions, Nodemailer |
| Linting    | ESLint 9, typescript-eslint             |

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Environment Variables

For the contact form to work, set these on your Vercel dashboard:

| Variable    | Description                        |
| ----------- | ---------------------------------- |
| `MAIL_USER` | SMTP email address                 |
| `MAIL_PASS` | SMTP email password / app password |
| `MAIL_TO`   | Recipient email address            |

## Project Structure

```
src/
├── components/     # Header, Footer, ThemeToggle, ParticleBackground, ProjectCard, etc.
├── contexts/       # ThemeContext / ThemeProvider (shared dark/light/system state)
├── hooks/          # useTheme (convenience wrapper around ThemeContext)
├── pages/          # Home, About, Projects, Contact
└── assets/         # Images
api/
└── contact.js      # Vercel serverless function for email
```

## Deployment

Deployed on **Vercel** with zero-config auto-detection for Vite. The `api/` directory is automatically detected as serverless functions.
