import cssModules from './cssModules';

describe('css-modules', () => {
  it('should return a function', () => {
    expect(cssModules()).toBeInstanceOf(Function);
  });

  describe('returned function', () => {
    it('should pass through key as className if not found', () => {
      const getClassName = cssModules();

      expect(getClassName('foo')).toEqual('foo');
      expect(getClassName('bar')).toEqual('bar');
      expect(getClassName('baz')).toEqual('baz');
    });

    it('should resolve classNames for known keys', () => {
      const getClassName = cssModules({
        foo: 'a',
        bar: 'b',
        baz: 'c',
      });

      expect(getClassName('foo')).toEqual('a');
      expect(getClassName('bar')).toEqual('b');
      expect(getClassName('baz')).toEqual('c');
    });
  });
});

