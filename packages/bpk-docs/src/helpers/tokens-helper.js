import kebabCase from 'lodash/kebabCase';

export const toPx = (value) => {
  let parsed = null;

  if (/rem$/.test(value)) {
    parsed = parseFloat(value.replace(/rem/, '')) * 16;
  }

  if (/%$/.test(value)) {
    parsed = parseFloat((value.replace(/%/, '')) / 100) * 16;
  }

  return parsed ? `${parsed}px` : null;
};

export const formatTokenName = name => kebabCase(name);

export const formatTokenValue = (value) => {
  const pxValue = toPx(value);
  return pxValue ? `${value} (${pxValue})` : value;
};
