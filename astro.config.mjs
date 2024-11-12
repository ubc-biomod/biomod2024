// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

import tailwind from "@astrojs/tailwind";

import react from "@astrojs/react";

import netlify from '@astrojs/netlify';

import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: "UBC BIOMOD",
      social: {
        github: "https://github.com/withastro/starlight",
      },
      sidebar: [
        {
          label: "Home",
          link: "/",
          badge: "Hidden",
        },
        {
          label: "Ideas",
          autogenerate: { directory: "ideas" },
        },
        {
          label: "ELSI",
          autogenerate: { directory: "elsi" },
        },
        {
          label: "Lab Notebook",
          autogenerate: { directory: "lab-notebook" },
          badge: {
            text: "Call to Action",
          },
        },
        {
          label: "Sponsors",
          link: "/sponsors",
          badge: "Hidden",
        },
      ],
      components: {
        Header: "./src/components/overrides/Header.astro",
        Sidebar: "./src/components/overrides/Sidebar.astro",
        Pagination: "./src/components/overrides/Pagination.astro",
        Footer: "./src/components/overrides/FooterWrapper.astro",
      },
      customCss: ["./src/tailwind.css"],
    }),
    tailwind(),
    react(),
  ],
  vite: {
    ssr: {
      noExternal: [
        "https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css",
      ],
    },
  },
  output: "server",
  adapter: netlify(),
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
  },
});
