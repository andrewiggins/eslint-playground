// Type annotation for eslint plugin: /** @type {import('eslint').Rule.RuleModule} */

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

    return {
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
