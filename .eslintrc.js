module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  extends: [
    'airbnb',
    "eslint:recommended",
    "plugin:react/recommended"
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'react-hooks',
    "jest"
  ],
  "settings": {
    "import/resolver": {
      "node": {
        "paths": [
          "app"
        ]
      }
    }
  },
  rules: {
    "getter-return": 2,
    "no-console": 2,
    "no-dupe-keys": 2,
    "no-duplicate-case": 2,
    "no-inner-declarations": 2,
    "no-irregular-whitespace": 2,
    "curly": 2,
    "dot-location": 2,
    "react/prefer-stateless-function": [0, { "ignorePureComponents": true }],
    "react/jsx-filename-extension": [0, { "extensions": [".js", ".jsx"] }],
    "prefer-template": 0,
    "react/jsx-props-no-spreading": [0, { "exceptions": ["Tasks"] }],
    "import/no-named-as-default": 0,
    "template-curly-spacing" : "off",
    "import/no-webpack-loader-syntax": 0,
    "jsx-a11y/click-events-have-key-events": 0,
    "jsx-a11y/no-static-element-interactions": 0,
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    indent : "off",
  },
  overrides: [
    { 
      files: ["*.spec.js"],
      rules: {
        "no-undef": "off"
      }
    }
  ],
  parser: "babel-eslint",
};
