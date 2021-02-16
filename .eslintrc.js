// eslint-disable-next-line no-undef
module.exports = {
  "root":true,
  "env": {
      "browser": true,
      "es2021": true
  },
  "extends": [
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "prettier/@typescript-eslint"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
      "ecmaVersion": 12,
      "sourceType": "module"
  },
  "plugins": [
      "@typescript-eslint"
  ],
  "rules": {
    "no-console": "warn",
    "no-debugger": "warn",
    "no-empty": ["error", { allowEmptyCatch: true }],
    eqeqeq: "error",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/member-delimiter-style": [
      "error",
      {
        multiline: {
          delimiter: "none"
        },
        singleline: {
          delimiter: "semi"
        }
      }
    ],
    "@typescript-eslint/no-use-before-define": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/no-extra-semi": "off"
  }
};
