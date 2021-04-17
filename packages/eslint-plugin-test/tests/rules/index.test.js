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
      code: 'import library from "library";',
      errors: [{ messageId: "noReturnType" }],
      // output: "let a = 0;",
    },
    {
      code: 'import * as library from "library";',
      errors: [{ messageId: "noReturnType" }],
      // output: "let a = 0;",
    },
    {
      code: 'import * as library, { Dialog } from "library";',
      errors: [{ messageId: "noReturnType" }],
      // output: "let a = 0;",
    },
  ],
});
