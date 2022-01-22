// These would live in some common module used by the tracker and configuration

const READ = Symbol();
const MISSING = Symbol();
const ASSIGNED = Symbol();

// Exploration of what a possible config might look like to determine how to
// track usage

function getConfig() {
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
