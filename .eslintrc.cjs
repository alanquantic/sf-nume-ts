module.exports = {
  extends: [
    'airbnb',
    'airbnb-typescript',
  ],
  parserOptions: {
    project: ['./tsconfig.json'],
    tsconfigRootDir: __dirname,
  },
  ignorePatterns: [
    '.eslintrc.cjs',
    'vite.config.ts',
  ],
  rules: {
    // El repo usa CRLF en Windows y no hay normalizacion via .gitattributes.
    // Se apaga para que el lint se enfoque en problemas reales; enforcar LF con
    // .gitattributes + renormalizacion queda como mejora futura.
    'linebreak-style': 'off',
    'import/extensions': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/no-duplicates': 'off',
    'import/order': 'off',
    'import/no-self-import': 'off',
    'import/no-cycle': 'off',
    'import/no-relative-packages': 'off',
    'import/no-named-as-default': 'off',
    'import/no-useless-path-segments': 'off',
    'react/react-in-jsx-scope': 'off',
    'max-len': [
      'error',
      {
        code: 200,
      },
    ],
    'no-console': 'off',
  },
};
