import { AST_NODE_TYPES as NODE, TSESTree } from "@typescript-eslint/types";
import { libraryName } from "./utils.js";

/**
 * @typedef {{}} MessageIds
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
    messages: {},
    schema: [],
  },
  create(context) {
    /**
     * @typedef {import('@typescript-eslint/experimental-utils').TSESLint.SourceCode} SourceCode
     * @typedef {import('@typescript-eslint/experimental-utils').TSESLint.Scope.Variable} Variable
     * @type {WeakMap<SourceCode, Variable[]>}
     */
    let importsFromLib = new WeakMap();

    /**
     * @param {TSESTree.JSXTagNameExpression} node
     * @returns {string | null}
     */
    function getJSXComponentName(node) {
      if (node.type == NODE.JSXIdentifier) {
        if (node.name.match(/^[A-Z]/)) {
          return node.name;
        } else {
          return null;
        }
      } else if (
        node.type == NODE.JSXMemberExpression ||
        node.type == NODE.JSXNamespacedName
      ) {
        throw Error(`Unsupported JSXOpeningElement name type: ${node.type}`);
      } else {
        throw new Error(`Unknown JSXOpeningElement name type: ${node}.`);
      }
    }

    return {
      Program(node) {
        importsFromLib.set(context.getSourceCode(), []);
      },
      ImportDeclaration(node) {
        if (node.source.value == libraryName) {
          const sourceCode = context.getSourceCode();
          const scopeManager = sourceCode.scopeManager;
          const variables = scopeManager?.getDeclaredVariables(node);
          if (variables) {
            importsFromLib.set(sourceCode, variables);
          }
        }
      },
      JSXOpeningElement(node) {
        const componentName = getJSXComponentName(node.name);
        if (!componentName) {
          // Not a component
          return;
        }

        const scope = context.getScope();
        const componentVar = scope.set.get(componentName);
        if (!componentVar) {
          // Whaaat?
          return;
        }

        const libImports = importsFromLib.get(context.getSourceCode());
        if (!libImports) {
          return;
        }

        if (libImports.includes(componentVar)) {
          console.log(componentVar);
        }
      },
    };
  },
};

export default noNamespaceImport;
