import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { ESLintUtils } from "@typescript-eslint/experimental-utils";

const { RuleTester } = ESLintUtils;

// Alias mocha names to the names TS ESLint utils expects
globalThis.afterAll = after;
globalThis.beforeAll = before;

const __dirname = dirname(fileURLToPath(import.meta.url));
export const pkgRoot = (...args) => join(__dirname, "..", "..", ...args);

// ESLint RuleTester class requires absolute paths to custom parsers
// const parserUrl = await import.meta.resolve("@typescript-eslint/parser");

/** @type {import("@typescript-eslint/experimental-utils").TSESLint.RuleTesterConfig} */
const testConfig = {
  // env: {
  //   browser: true,
  //   es2021: true,
  // },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    // ESTree parser options from eslint --init
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    sourceType: "module",

    // From TS ESLint types
    tsconfigRootDir: pkgRoot("tests/fixtures"),
    project: ["./tsconfig.json"],
  },
  // plugins: ["react", "@typescript-eslint"],
};

export const createRuleTester = () => new RuleTester(testConfig);
