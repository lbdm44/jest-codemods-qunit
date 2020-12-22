import { API, FileInfo, Transform } from 'jscodeshift';

/**
 * This replaces every occurrence of variable "foo".
 */
const transform: Transform = (fileInfo: FileInfo, api: API) => {
  return api.jscodeshift(fileInfo.source).findVariableDeclarators('foo').renameTo('bar').toSource();
};

export default transform;
