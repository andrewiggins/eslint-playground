import { ASSIGNED, MISSING, READ } from "./tracking-utils";

export default function getConfig() {
  return {
    library: {
      Dialog: {
        [READ]: true,
        title: {
          [MISSING]: true,
          [ASSIGNED]: {
            type: "object",
            properties: ["src", "alt"],
          },
        },
      },
    },
  };
}
