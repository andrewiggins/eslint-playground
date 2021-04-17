import { fileURLToPath } from "url";
import { RuleTester } from "eslint";

const parserUrl = await import.meta.resolve("@typescript-eslint/parser");

export const createRuleTester = () =>
  new RuleTester({
    env: {
      browser: true,
      es2021: true,
    },
    parser: fileURLToPath(parserUrl),
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
      ecmaVersion: 12,
      sourceType: "module",
    },
    plugins: ["react", "@typescript-eslint"],
  });
