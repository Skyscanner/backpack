const DIRECTIONS = {
  LTR: 'ltr',
  RTL: 'rtl',
};

const getDirection = () => (
  ((typeof document !== 'undefined' && document.documentElement.dir) || DIRECTIONS.LTR).toLowerCase()
);

const isRTL = () => getDirection() === DIRECTIONS.RTL;

const rtlConditionalValue = (ltrValue, rtlValue) => (isRTL() ? rtlValue : ltrValue);

const applyArrayRTLTransform = arr => (isRTL() ? arr.slice(0).reverse() : arr);

const applyDirectionalRTLTransform = (obj) => {
  if (!isRTL()) {
    return obj;
  }
  const { left, right, ...rest } = obj;
  return {
    left: right,
    right: left,
    ...rest,
  };
};

export {
  applyArrayRTLTransform,
  applyDirectionalRTLTransform,
  rtlConditionalValue,
  isRTL,
};
