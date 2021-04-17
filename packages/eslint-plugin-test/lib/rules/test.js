/** @type {import('eslint').Rule.RuleModule} */
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
      noVar: "Do not use `var` declarations",
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
      VariableDeclaration(node) {
        if (node.kind == "var") {
          context.report({
            node,
            messageId: "noVar",
            fix(fixer) {
              const sourceCode = context.getSourceCode();
              return fixer.replaceText(
                node,
                sourceCode.getText(node).replace("var", "let")
              );
            },
          });
        }
      },
    };
  },
};

export default testRule;
