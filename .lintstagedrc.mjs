export default {
  '*.{js,jsx,ts,tsx}': ['prettier --write'],
  '**/*.ts?(x)': () => 'npm run type-check',
  '*.json': ['prettier --write'],
};
