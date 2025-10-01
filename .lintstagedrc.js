const path = require('path');

const buildEslintCommand = (filenames) =>
  `npm run lint -- ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(' ')}`;

module.exports = {
  // Type check TypeScript files
  '*/.(ts|tsx)': () => 'npm run tsc --noEmit',
  '*.{js,jsx,ts,tsx,json,md,prettierrc,css,scss}':
    'prettier --write --config .prettierrc',
  '*.{js,jsx,ts,tsx}': [buildEslintCommand],
};
