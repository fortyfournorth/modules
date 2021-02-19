# @44North ESLint Config

The standard 44 North [ESLint](https://eslint.org/) Configuration.

Setup for [Prettier](https://prettier.io/) and [TypeScript](https://www.typescriptlang.org/) with [Jest](https://jestjs.io/) and [Jest Extended](https://www.npmjs.com/package/jest-extended).

## Install

```
yarn add eslint @44north/eslint-config @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-config-prettier eslint-plugin-html eslint-plugin-import eslint-plugin-jest eslint-plugin-jest-extended eslint-plugin-jsx-a11y eslint-plugin-prettier eslint-plugin-react eslint-plugin-react-hooks prettier --dev
```

## Configure

```js
// .eslintrc.json
{
  "extends": ["@44north"]
}
```

## Recommended ESLint Ignore

```
build
coverage
*.db
*.log
*.lock
*.json
docs
node_modules
public
prettier.config.js
```
