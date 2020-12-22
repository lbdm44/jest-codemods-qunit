import { strictEqual } from 'assert';
import index from './index';

describe('Typescript usage suite', () => {
  it('should be able to execute a test', () => {
    strictEqual(true, true);
  });
  it('should return expected string', () => {
    strictEqual(index('incoming'), 'incoming-static-v2');
  });
});
