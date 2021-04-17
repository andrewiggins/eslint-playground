import noNamespaceRule from "../../lib/rules/no-namespace-import.js";
import { createRuleTester } from "./utils.js";

const tester = createRuleTester();
tester.run("no-namespace-import", noNamespaceRule, {
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
      code: 'import * as library from "library";',
      errors: [{ messageId: "noNamespaceImports" }],
    },
  ],
});
