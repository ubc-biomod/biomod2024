import starlightPlugin from '@astrojs/starlight-tailwind';

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontSize: {
        navText: "1.5rem",
        title: "3.5rem",
      },
    },
  },
  plugins: [starlightPlugin()],
};
