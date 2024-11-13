export default {
  "*.{js,jsx,ts,tsx,mdx}": ["prettier --write"],
  "**/*.ts?(x)": () => "npm run type-check",
  "*.json": ["prettier --write"],
};
