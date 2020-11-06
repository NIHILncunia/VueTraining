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
    "no-empty": 1,
    
    "vue/html-self-closing": 0,
    "vue/attributes-order": 0,
    "vue/max-attributes-per-line": 0,
    "vue/v-on-style": 0,
    "vue/v-bind-style": 0,
    "vue/singleline-html-element-content-newline": 0
  }
};