// Type annotation for eslint plugin: /** @type {import('eslint').Rule.RuleModule} */

// TODO: Look at the utilities in eslint-utils: https://eslint-utils.mysticatea.dev/
// Re-exported in @typescript/experimental-utilities as ASTUtils

/** @type {import('@typescript-eslint/experimental-utils').TSESLint.RuleModule} */
const testRule = {
  meta: {
    type: "suggestion",
    fixable: "code",
    docs: {
      description: "test eslint rule",
      category: "Possible Errors",
      recommended: true,
      url: "",
    },
    messages: {
      noReturnType: "Function has no return type.",
    },
    // rule options schema
    // schema: []
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

    function getTSInfo(node) {
      if (context.parserServices.hasFullTypeInformation) {
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
