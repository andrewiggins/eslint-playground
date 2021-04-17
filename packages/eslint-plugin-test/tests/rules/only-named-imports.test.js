import onlyNamedImports from "../../lib/rules/only-named-imports.js";
import { createRuleTester } from "./utils.js";

const tester = createRuleTester();
tester.run("only-named-imports", onlyNamedImports, {
  valid: [
    {
      // code: `
      //   import React from "react";
      //   import { Dialog } from "library" ;

      //   export function Test(): JSX.Element {
      //     return <Dialog title={{ src: "", alt: "" }} />;
      //   }`,
      code: `import { Dialog } from "library" ;`,
    },
    {
      code: `import { Dialog as DialogLocal } from "library";`,
    },
  ],
  invalid: [
    {
      code: 'import * as library from "library";',
      errors: [{ messageId: "noNamespaceImports" }],
    },
    {
      code: 'import library from "library";',
      errors: [{ messageId: "noDefaultImports" }],
    },
    {
      code: 'import library, { Dialog } from "library";',
      errors: [{ messageId: "noDefaultImports" }],
    },
  ],
});
