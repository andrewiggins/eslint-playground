import testRule from "../../lib/rules/test.js";
import { createRuleTester } from "./utils.js";

const tester = createRuleTester();
tester.run("testRule", testRule, {
  valid: [
    {
      code: `
        import React from "react";
        import { Dialog } from "library" ;

        export function Test(): JSX.Element {
          return <Dialog title={{ src: "", alt: "" }} />;
        }`,
    },
  ],
  invalid: [
    {
      code: "function f() {}",
      errors: [{ messageId: "noReturnType" }],
      // output: "let a = 0;",
    },
  ],
});
