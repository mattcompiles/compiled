# @compiled/eslint-plugin

## 0.6.0

### Minor Changes

- a41e41e6: Update monorepo node version to v18, and drop support for node v12

## 0.5.0

### Minor Changes

- 1dc17bce: Add new ESLint rule for CSS prop without css function

## 0.4.8

### Patch Changes

- e887c2b5: Clean up dependencies of packages

## 0.4.7

### Patch Changes

- 7fc17211: Wrap strings with quotes when auto-fixing tagged template expressions in ESLint rule

## 0.4.6

### Patch Changes

- 8acf1e21: Allow exporting components with references to css({})
- 5e856e8c: Autofix empty tagged template expressions
- 08a963fc: Bump flowgen types

## 0.4.5

### Patch Changes

- de283788: Fix: double quotes when autofixing no-\*-tagged-template-expression
- 72187dc1: Fix: selector disappears when autofixing no-\*-tagged-template-expression linting errors

## 0.4.4

### Patch Changes

- 62987200: Fix eslint rule breaking when having multiple selectors across lines

## 0.4.3

### Patch Changes

- 10533c7f: Add Type support to no-styled-tagged-template-expression ESLint rule

## 0.4.2

### Patch Changes

- c8371532: Handle whole module imports

## 0.4.1

### Patch Changes

- 6e92764: Fix no-exported-css and no-exported-keyframes errors within components

## 0.4.0

### Minor Changes

- a57d3be: Add no-exported-css and no-exported-keyframes rules

## 0.3.0

### Minor Changes

- 5d699ed: Add no-tagged-template-expression rules for each API

### Patch Changes

- 356b120: Apply react/jsx-filename-extension rule as needed

## 0.2.2

### Patch Changes

- 8c9ab8c: Adds url to lint rules
- 8c9ab8c: Update `homepage` and other `package.json` properties

## 0.2.1

### Patch Changes

- dedadbb: The `jsx-pragma` rule now removes the default react import when moving to the automatic runtime and it isn't used.

## 0.2.0

### Minor Changes

- f203635: Renames `emotion-to-compiled` rule to `no-emotion-css`.

### Patch Changes

- f203635: The `no-emotion-css` rule now keeps the jsx pragma around if defined.
- f203635: The `no-emotion-css` rule now will check for `jsxImportSource` pragma usage with a supplementary fixer.
- 1a9e503: Adds `jsx-pragma` rule,
  useful when working with the `css` prop.
  When enabled it will error when the jsx pragma is missing or when using the wrong pragma for the configured runtime.
- 79cfb08: Package now built with project references.
- 79cfb08: Internal refactor changing how the TypeScript compiler picks up source files.

## 0.1.0

### Minor Changes

- 507bcad: Initial release of the `@compiled/eslint-plugin`. This will become a useful complementary tool to use with the `@compiled` library.
