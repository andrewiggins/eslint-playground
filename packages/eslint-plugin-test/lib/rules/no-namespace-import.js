import { AST_NODE_TYPES as NODE } from "@typescript-eslint/types";
import { libraryName } from "./utils.js";

/**
 * @typedef {"noNamespaceImports"} MessageIds
 * @type {import('@typescript-eslint/experimental-utils').TSESLint.RuleModule<MessageIds, []>}
 */
const noNamespaceImport = {
  meta: {
    type: "problem",
    docs: {
      description: `Forbid namespace imports of "${libraryName}"`,
      category: "Possible Errors",
      recommended: "error",
      url: "",
    },
    messages: {
      noNamespaceImports: `Do not import "${libraryName}" as a namespace. Use named imports instead`,
    },
    schema: [],
  },
  create(context) {
    return {
      ImportDeclaration(node) {
        if (node.source.value == libraryName) {
          const containsNamespaceImport = node.specifiers.some(
            (specifier) => specifier.type == NODE.ImportNamespaceSpecifier
          );

          if (containsNamespaceImport) {
            context.report({
              node,
              messageId: "noNamespaceImports",
            });
          }
        }
      },
    };
  },
};

export default noNamespaceImport;
