module.exports = {
  root: true,
  "env": {
    "browser": true,
    "commonjs": true,
    "es6": true,
    "node": true,
  },
  "extends": [
    "eslint:recommended",
    "plugin:vue/recommended",
  ],
  "globals": {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly"
  },
  "parserOptions": {
    "ecmaVersion": 2020,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": false,
    },
    "parser": "babel-eslint"
  },
  "plugins": [
    "import",
  ],
  "rules": {
    "no-console": 0,
    "no-unused-vars": 1,
    "semi": 2,
    "no-unexpected-multiline": 0,
    "no-empty": 1
  }
};