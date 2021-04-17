import testRule from "../../lib/rules/test.js";
import { createRuleTester } from "./utils.js";

const tester = createRuleTester();
tester.run("testRule", testRule, {
  valid: [{ code: "let a = 0;" }, { code: "const a = 0;" }],
  invalid: [
    {
      code: "var a = 0;",
      errors: [{ messageId: "noVar" }],
      output: "let a = 0;",
    },
  ],
});
