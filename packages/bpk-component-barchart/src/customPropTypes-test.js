import chartDataProp from './customPropTypes';

const goodData = [
  {
    day: 'mon',
    price: 123,
  },
];

const badData = [
  {
    day: 'mon',
    value: 123,
  },
];

describe('chartDataProp', () => {
  it('should fail if data is not an array', () => {
    const result = chartDataProp({ data: {}, yScaleDataKey: 'price' }, 'data', 'BpkBarchart');

    expect(result).not.toBeNull();
    expect(result).toEqual(expect.any(Error));
  });

  it('should fail if on object is missing a scale key', () => {
    const result = chartDataProp(
      { data: badData, xScaleDataKey: 'day', yScaleDataKey: 'price' }, 'data', 'BpkBarchart',
    );

    expect(result).not.toBeNull();
    expect(result).toEqual(expect.any(Error));
  });

  it('should return null for valid data', () => {
    const result = chartDataProp(
      { data: goodData, xScaleDataKey: 'day', yScaleDataKey: 'price' }, 'data', 'BpkBarchart',
    );

    expect(result).toBeNull();
  });
});
