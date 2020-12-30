import { API, FileInfo, Transform } from 'jscodeshift';

/**
 * This replaces every occurrence of variable "foo".
 */
const transform: Transform = (fileInfo: FileInfo, api: API) => {
  const j = api.jscodeshift;
  const ast = j(fileInfo.source);

  // Replace `QUnit.module` with `describe` calls.
  ast
    .find(j.CallExpression, (callExpression) => {
      const { callee } = callExpression;

      return callee.object?.name === 'QUnit' && callee.property?.name === 'module';
    })
    .replaceWith((path) => {
      const [moduleName, moduleDefinition] = path.value.arguments;

      let describeBody = moduleDefinition;

      if (moduleDefinition.type === 'FunctionExpression') {
        describeBody = j.arrowFunctionExpression(moduleDefinition.params, moduleDefinition.body);
      }

      return j.callExpression(j.identifier('describe'), [moduleName, describeBody]);
    });

  // Replace `QUnit.test` calls with `test` calls.
  ast
    .find(j.CallExpression, (callExpression) => {
      const { callee } = callExpression;

      return callee.object?.name === 'QUnit' && callee.property?.name === 'test';
    })
    .replaceWith((path) => {
      const [moduleName, moduleDefinition] = path.value.arguments;

      let testBody = moduleDefinition;

      if (moduleDefinition.type === 'FunctionExpression') {
        testBody = j.arrowFunctionExpression([], moduleDefinition.body);
      }

      return j.callExpression(j.identifier('test'), [moduleName, testBody]);
    });

  // Replace `assert.equal` with expect(...).toBe(...)
  ast
    .find(j.CallExpression, (callExpression) => {
      const { callee } = callExpression;

      return callee.object?.name === 'assert';
    })
    .replaceWith((path) => {
      const [actualArg, expectedArg, msgArg] = path.value.arguments;

      const expectBlock = j.callExpression(j.identifier('expect'), [actualArg]);

      if (!!msgArg && msgArg.type === 'Literal' && typeof msgArg.value === 'string') {
        expectBlock.comments = expectBlock.comments || [];
        expectBlock.comments.push(j.commentLine(` '${msgArg.value}'`));
      }

      return j.memberExpression(expectBlock, j.callExpression(j.identifier('toBe'), [expectedArg]));
    });

  return ast.toSource();
};

export default transform;
