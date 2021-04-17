import trackUsage from "../../lib/rules/track-usage.js";
import { createRuleTester } from "./utils.js";

const tester = createRuleTester();
tester.run("trackUsage", trackUsage, {
  valid: [
    // We do not support re-assigning imports. It's too difficult to track
    // {
    //   code: `import { Dialog } from "library"; var A = Dialog; <A />;`,
    // },
    {
      code: `import { Dialog } from "library"; <Dialog />`,
    },
  ],
  invalid: [],
});
