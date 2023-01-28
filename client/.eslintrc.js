module.exports = {
    "extends": ["plugin:prettier/recommended"],
    "parser": "babel-eslint",
    "parserOptions": {
      "ecmaVersion": 9,
      "ecmaFeatures": {
        "impliedStrict": true,
        "jsx": true
      }
    },
    "env": {
      "node": true,
      "es6": true
    },
    "plugins": ["react"],
    "rules": {
      "react/jsx-filename-extension": ["off"],
      "react/prefer-stateless-function": ["off"],
      "arrow-body-style": ["error", "always"],
      "react/self-closing-comp": "off"
    }
  }
