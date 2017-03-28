import applyRTLTransforms from './applyRTLTransforms';

jest.mock('./getScriptDirection', () => jest.fn());

describe('applyRTLTransforms', () => {
  it('should clone given object', () => {
    const original = { foo: 'bar' };
    const result = applyRTLTransforms(original);

    expect(result).toEqual(original);
    expect(result).not.toBe(original);
  });

  it('should transform "left" to "right" on "attachment" property when script direction is "rtl"', () => {
    require('./getScriptDirection').mockReturnValueOnce('rtl'); // eslint-disable-line global-require
    const original = { attachment: 'middle left' };
    const result = applyRTLTransforms(original);

    expect(result.attachment).toEqual('middle right');
  });

  it('should transform "right" to "left" on "attachment" property when script direction is "rtl"', () => {
    require('./getScriptDirection').mockReturnValueOnce('rtl'); // eslint-disable-line global-require
    const original = { attachment: 'middle right' };
    const result = applyRTLTransforms(original);

    expect(result.attachment).toEqual('middle left');
  });

  it('should not transform "left" to "right" on "attachment" property when script direction isnt "rtl"', () => {
    require('./getScriptDirection').mockReturnValueOnce('ltr'); // eslint-disable-line global-require
    const original = { attachment: 'middle left' };
    const result = applyRTLTransforms(original);

    expect(result.attachment).toEqual('middle left');
  });

  it('should not transform "right" to "left" on "attachment" property when script direction isnt "rtl"', () => {
    require('./getScriptDirection').mockReturnValueOnce('ltr'); // eslint-disable-line global-require
    const original = { attachment: 'middle right' };
    const result = applyRTLTransforms(original);

    expect(result.attachment).toEqual('middle right');
  });

  it('should transform "left" to "right" on "targetAttachment" property when script direction is "rtl"', () => {
    require('./getScriptDirection').mockReturnValueOnce('rtl'); // eslint-disable-line global-require
    const original = { targetAttachment: 'middle left' };
    const result = applyRTLTransforms(original);

    expect(result.targetAttachment).toEqual('middle right');
  });

  it('should transform "right" to "left" on "targetAttachment" property when script direction is "rtl"', () => {
    require('./getScriptDirection').mockReturnValueOnce('rtl'); // eslint-disable-line global-require
    const original = { targetAttachment: 'middle right' };
    const result = applyRTLTransforms(original);

    expect(result.targetAttachment).toEqual('middle left');
  });

  it('should not transform "left" to "right" on "targetAttachment" property when script direction isnt "rtl"', () => {
    require('./getScriptDirection').mockReturnValueOnce('ltr'); // eslint-disable-line global-require
    const original = { targetAttachment: 'middle left' };
    const result = applyRTLTransforms(original);

    expect(result.targetAttachment).toEqual('middle left');
  });

  it('should not transform "right" to "left" on "targetAttachment" property when script direction isnt "rtl"', () => {
    require('./getScriptDirection').mockReturnValueOnce('ltr'); // eslint-disable-line global-require
    const original = { targetAttachment: 'middle right' };
    const result = applyRTLTransforms(original);

    expect(result.targetAttachment).toEqual('middle right');
  });
});
