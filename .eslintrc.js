module.exports =  {
  parser:  '@typescript-eslint/parser',
  extends: [
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint', 
    'plugin:prettier/recommended',
  ],
  parserOptions: {
  ecmaVersion: 2018,
  sourceType:  'module',
  ecmaFeatures: {
    tsx: true,
    },
  },
  rules: {
    "@typescript-eslint/explicit-function-return-type": "off",
    "react/prop-types": 0,
    "@typescript-eslint/no-unused-vars": 0,
  },
  settings: {
    react: {
      version:  'detect',
    },
  },
};