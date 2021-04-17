import testRule from "../../lib/rules/test.js";
import { createRuleTester } from "./utils.js";

const tester = createRuleTester();
tester.run("testRule", testRule, {
  valid: [{ code: "function f(): void {}" }],
  invalid: [
    {
      code: "function f() {}",
      errors: [{ messageId: "noReturnType" }],
      // output: "let a = 0;",
    },
  ],
});
