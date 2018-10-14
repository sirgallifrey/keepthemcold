module.exports = {
  "env": {
    "es6": true,
    "node": true
  },
  "parser": "babel-eslint",
  "extends": ["eslint:recommended", "react-app"],
  "parserOptions": {
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true,
    },
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
    "quote-props": ["error", "as-needed"],
    "object-curly-spacing": ["error", "always"],
    "jsx-a11y/href-no-hash": "off",
    "jsx-a11y/anchor-is-valid": ["warn", { "aspects": ["invalidHref"] }]
  }
};
