# AE Portfolio

This is a single-page portfolio website built with Next.js and Framer Motion. It features a modern design with a glassmorphism effect and smooth scrolling animations.

## Getting Started

First, run the development server:

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **UI:** [React](https://react.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Animation:** [Framer Motion](https://www.framer.com/motion/)
- **Smooth Scrolling:** [Lenis](https://lenis.studio/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)

## Codebase Architecture

The codebase is structured to separate content from presentation, making it easy to manage and update.

- **`app/`**: This directory contains the main application files, including the global layout (`layout.tsx`), global styles (`globals.css`), and the main page (`page.tsx`).

- **`components/`**: This directory is divided into two subdirectories:
    - **`pages/`**: Contains the components for each section of the portfolio (e.g., `Landing.tsx`, `About.tsx`, `Skills.tsx`). These components are responsible for the layout and animations of each section.
    - **`ui/`**: Contains reusable UI components that are used throughout the application (e.g., `GlassCard.tsx`, `Section.tsx`, `Typography.tsx`).

- **`config/`**: This directory holds the configuration files for the portfolio.
    - **`portfolio.ts`**: This is the single source of truth for all the content in the portfolio. It exports a `portfolioConfig` object that contains all the text, skills, projects, and other data displayed on the website.

- **`public/`**: This directory contains all the static assets, such as images and icons.

## Content Management

All the content of the portfolio is managed in the `config/portfolio.ts` file. To update the content of the website, you only need to modify the `portfolioConfig` object in this file.

The `portfolioConfig` object has the following structure:

```typescript
export const portfolioConfig = {
  name: "Your Name",
  main_landing: {
    title: "Your Title",
    sub_title: "Your Sub-title",
  },
  about: {
    title: "About Me",
    text: "A description about yourself.",
  },
  // ... and so on for each section
};
```

To change the text, images, or any other content, simply find the corresponding key in the `portfolioConfig` object and update its value.

## Theming

The visual theme of the website (colors and fonts) is defined in the `app/globals.css` file using CSS variables.

### Colors

The primary colors are defined with CSS variables. To change the color scheme, you can update the values of these variables:

```css
@theme {
  --color-brand-bg: 255 255 255;
  --color-brand-pink: 225 83 236;
  --color-brand-text: 0 0 0;
  /* ... other color variables */
}
```

### Fonts

The fonts used in the project are [Rubik](https://fonts.google.com/specimen/Rubik) for sans-serif text and [Oswald](https://fonts.google.com/specimen/Oswald) for display text. These are loaded in the `app/layout.tsx` file.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.