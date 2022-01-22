import trackUsage from "../../lib/rules/track-usage.js";
import { createRuleTester, createTypedRuleTester } from "./utils.js";

// const tester = createTypedRuleTester(); // Use this to enable type info, but much slower
const tester = createRuleTester();
tester.run("trackUsage", trackUsage, {
  valid: [
    // We do not support re-assigning imports. It's too difficult to track
    // {
    //   code: `import { Dialog } from "library"; var A = Dialog; <A />;`,
    // },
    {
      code: `import { Dialog } from "library"; <Dialog title />`,
    },
    {
      code: `import {Dialog as DialogLocal } from "library"; <DialogLocal title />;`,
    },
  ],
  invalid: [],
});
