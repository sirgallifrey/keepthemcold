module.exports = {
  "extends": ["eslint:recommended"],
  "parserOptions": {
    "sourceType": "module",
    "ecmaVersion": 8,
  },
  "rules": {
    "complexity": ["error", 5],
    "quotes": ["error", "single"],
    "prefer-const": "error",
    "no-var": "error",
    "eol-last": "error",
    "indent": ["error", 2],
    "semi": ["error", "always"],
    "padded-blocks": ["error", "never"],
    "object-curly-spacing": ["error", "always"],
  }
};
