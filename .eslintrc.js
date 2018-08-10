'use strict'

/**
 * ESLint configuration file for *.js (ES5)
 */

module.exports = {
  "env": {
    "browser": true,
    "node": true
  },
  "plugins": [
    "html"
  ],
  "extends": [
    "eslint:recommended",
    "airbnb-base/legacy"
  ],
  "settings": {
    "html/html-extensions": [".html"],
    "html/indent": "+2"
  },
  "globals": {
    "$": false,
    "index": false,
    "moTool": false,
    "R": false
  },
  "rules": {
    "comma-dangle": ["error", {
      "arrays": "always-multiline",
      "objects": "always-multiline",
      "imports": "never",
      "exports": "never",
      "functions": "ignore"
    }],
    'linebreak-style': 'off',
    "func-names": ["warn", "never"],
    "no-plusplus": ["error", { "allowForLoopAfterthoughts": true }],
    "radix": ["error", "as-needed"],
    "semi": ["error", "never"],
    "strict": ["error", "safe"],
    "vars-on-top": "off",
    "wrap-iife": ["error", "inside"]
  },
  "overrides": [
    {
      "files": ["*.html", "*.js", "*.njs"],
      "rules": {
        "strict": ["error", "never"]
      }
    }
  ]
}
