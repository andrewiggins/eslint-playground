// Type annotation for eslint plugin: /** @type {import('eslint').Rule.RuleModule} */

// TODO: Look at the utilities in eslint-utils: https://eslint-utils.mysticatea.dev/
// Re-exported in @typescript/experimental-utilities as ASTUtils

import { ASTUtils } from "@typescript-eslint/experimental-utils";
const { ReferenceTracker } = ASTUtils;

/**
 * @typedef {"noReturnType" | "disallowed"} MessageIds
 * @type {import('@typescript-eslint/experimental-utils').TSESLint.RuleModule<MessageIds, []>}
 */
const testRule = {
  meta: {
    type: "suggestion",
    fixable: "code",
    docs: {
      description: "test eslint rule",
      category: "Possible Errors",
      recommended: "error",
      url: "",
    },
    messages: {
      noReturnType: "Function has no return type.",
      disallowed: "disallow {{name}}.",
    },
    schema: [], // rule options schema
  },
  create(context) {
    // Interesting scope & variable management:
    // context.getDeclaredVariables(node)
    // context.getScope()
    // context.markVariableAsUsed()
    // const scopeManager = context.getSourceCode().scopeManager;

    // Report errors:
    // context.report({
    //   node,
    //   message or messageId,
    //   data,
    //   fix(fixer) {},
    //   suggest: [],
    // })

    // How to get TS stuff:
    // const tsService = context.parserServices;

    /** @param {import("@typescript-eslint/experimental-utils").TSESTree.JSXTagNameExpression} node */
    function getTSInfo(node) {
      if (
        context.parserServices &&
        context.parserServices.hasFullTypeInformation
      ) {
        const esTreeNodeToTSNodeMap =
          context.parserServices.esTreeNodeToTSNodeMap;
        const program = context.parserServices.program;
        const typeChecker = program.getTypeChecker();
        const tsNode = esTreeNodeToTSNodeMap.get(node);

        // const tsType = typeChecker.getTypeAtLocation(node);
        const symbol = typeChecker.getSymbolAtLocation(tsNode);
        if (symbol) {
          const symbolName = typeChecker.getFullyQualifiedName(symbol);
          const symbolType = typeChecker.getTypeOfSymbolAtLocation(
            symbol,
            tsNode
          );

          return { symbol, symbolName, symbolType };
        }
      }
    }

    return {
      JSXOpeningElement(node) {
        console.log(getTSInfo(node.name));
      },
      "Program:exit"() {
        const tracker = new ReferenceTracker(context.getScope(), {
          globalObjectNames: [],
          mode: "legacy",
        });

        const traceMap = {
          // Find `Dialog` of `library` module.
          library: {
            // @ts-ignore Out-of-date types
            [ReferenceTracker.ESM]: true,
            Dialog: {
              [ReferenceTracker.READ]: true,
              title: {
                [ReferenceTracker.READ]: true,
              },
            },
          },
        };

        // @ts-ignore Out-of-date types
        for (const { node, path } of tracker.iterateEsmReferences(traceMap)) {
          context.report({
            node,
            messageId: "disallowed",
            data: { name: path.join(".") },
          });
        }
      },
      FunctionDeclaration(node) {
        if (node.returnType == null) {
          context.report({
            node,
            messageId: "noReturnType",
            // fix(fixer) {
            //   const sourceCode = context.getSourceCode();
            //   return fixer.replaceText(
            //     node,
            //     sourceCode.getText(node).replace("var", "let")
            //   );
            // },
          });
        }
      },
    };
  },
};

export default testRule;
