// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import netlify from '@astrojs/netlify';

// https://astro.build/config
export default defineConfig({
  integrations: [starlight({
      title: 'UBC BIOMOD',
      social: {
          github: 'https://github.com/withastro/starlight',
      },
      // customCss: [
      //   // Path to your Tailwind base styles:
      //   "./src/styles/tailwind.css",
      // ],
      sidebar: [
          {
              label: 'Home',
              link: '/',
              badge: 'Hidden'
          },
          {
              label: 'Ideas',
              autogenerate: { directory: 'ideas' },
          },
          {
              label: 'ELSI',
              autogenerate: { directory: 'elsi' },
          },
          {
              label: 'Lab Notebook',
              autogenerate: { directory: 'lab-notebook' },
              badge: {
                  text: 'Call to Action',
              }
          },
          {
              label: 'Sponsors',
              link: '/sponsors',
              badge: 'Hidden' 
          },
      ],
      components: {
          Header: './src/components/overrides/Header.astro',
          Sidebar: './src/components/overrides/Sidebar.astro',
          Pagination: './src/components/overrides/Pagination.astro',
          Footer: './src/components/overrides/FooterWrapper.astro',
      },
      customCss: ["./src/tailwind.css"],
      head: [
        {
          tag: "link",
          attrs: {
            rel: "stylesheet",
            href: "https://fonts.googleapis.com/icon?family=Material+Icons",
          },
        },
      ],
    }),
    tailwind(),
    react(),
  ],
  output: 'server',
  adapter: netlify(),
});
