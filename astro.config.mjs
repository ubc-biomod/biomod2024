// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind({
      // Disable the default base styles:
      applyBaseStyles: false,
    }),
    starlight({
      title: "My Docs",
      social: {
        github: "https://github.com/withastro/starlight",
      },
      // customCss: [
      //   // Path to your Tailwind base styles:
      //   "./src/styles/tailwind.css",
      // ],
      sidebar: [
        {
          label: "Guides",
          items: [
            // Each item here is one entry in the navigation menu.
            { label: "Example Guide", slug: "guides/example" },
          ],
        },
        {
          label: "Reference",
          autogenerate: { directory: "reference" },
        },
      ],
    }),
    react(),
  ],
  vite: {
    css: {
      preprocessorOptions: {
        css: {
          import: ["src/styles/global.css"], // Make this file global
        },
      },
    },
  },
});
