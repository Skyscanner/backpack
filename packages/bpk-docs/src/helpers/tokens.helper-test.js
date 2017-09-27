import { getTokenValue } from './tokens-helper';

describe('tokens-helper', () => {
  describe('getTokenValue', () => {
    describe('web', () => {
      describe('size', () => {
        it('should format rem token values to pixels', () => {
          expect(getTokenValue({ value: '1rem', type: 'size' }, 'web')).toEqual('1rem (16px)');
        });

        it('should not format pixel token values', () => {
          expect(getTokenValue({ value: '16px', type: 'size' }, 'web')).toEqual('16px');
        });

        it('should not format percentage token values', () => {
          expect(getTokenValue({ value: '100%', type: 'size' }, 'web')).toEqual('100%');
        });
      });

      describe('font-size', () => {
        it('should format rem token values to pixels', () => {
          expect(getTokenValue({ value: '1rem', type: 'font-size' }, 'web')).toEqual('1rem (16px)');
        });

        it('should format percentage token values to pixels', () => {
          expect(getTokenValue({ value: '100%', type: 'font-size' }, 'web')).toEqual('100% (16px)');
        });

        it('should not format pixel token values', () => {
          expect(getTokenValue({ value: '16px', type: 'font-size' }, 'web')).toEqual('16px');
        });
      });
    });

    describe('iOS', () => {
      describe('size', () => {
        it('should format token values to points', () => {
          expect(getTokenValue({ value: '4', type: 'size' }, 'ios')).toEqual('4pt');
        });
      });

      describe('font-size', () => {
        it('should format token values to points', () => {
          expect(getTokenValue({ value: '4', type: 'font-size' }, 'ios')).toEqual('4pt');
        });
      });
    });


    describe('Android', () => {
      describe('size', () => {
        it('should format token values to density independant pixels', () => {
          expect(getTokenValue({ value: '4', type: 'size' }, 'android')).toEqual('4dp');
        });
      });

      describe('font-size', () => {
        it('should format token values to scale independant pixels', () => {
          expect(getTokenValue({ value: '4', type: 'font-size' }, 'android')).toEqual('4sp');
        });
      });
    });
  });
});
