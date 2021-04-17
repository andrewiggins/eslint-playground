import { createTypedRuleTester } from "./utils.js";
import testRule from "../../lib/rules/test.js";

const tester = createTypedRuleTester();
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
    {
      code: `
        import React from "react";
        import { Dialog as DialogLocal } from "library" ;

        export function Test(): JSX.Element {
          return <DialogLocal title={{ src: "", alt: "" }} />;
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
