module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
    'plugin:import/recommended',
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  settings: {
    extensions: ['.js'],
    'import/resolver': {
      alias: {
        map: [
          ['@models', './src/scripts/models'],
          ['@components', './src/scripts/components'],
          ['@services', './src/scripts/services'],
          ['@styles', './src/styles'],
          ['@assets', './src/assets'],
          ['@config', './src/config.json'],
        ],
      },
    },
  },
};
