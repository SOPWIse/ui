import reactPlugin from "eslint-plugin-react";
import typescriptEslintPlugin from "@typescript-eslint/eslint-plugin";
import typescriptEslintParser from "@typescript-eslint/parser";

export default [
  {
    languageOptions: {
      ecmaVersion: 12,
      sourceType: "module",
      globals: {
        browser: true,
        es2021: true,
      },
      parser: typescriptEslintParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      react: reactPlugin,
      "@typescript-eslint": typescriptEslintPlugin,
    },
    rules: {},
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  {
    files: ["*.ts", "*.tsx"],
    rules: {},
  },
];
