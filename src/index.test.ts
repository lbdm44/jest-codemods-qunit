import assert from 'assert';
import index from './index';

describe('Typescript usage suite', () => {
  test('should return expected string', () => {
    expect(index('incoming')).toBe('incoming-static-v2');
  });
});
