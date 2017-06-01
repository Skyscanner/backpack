const DIRECTIONS = {
  LTR: 'ltr',
  RTL: 'rtl',
};

const getDirection = () => typeof document !== 'undefined' && (document.documentElement.dir || DIRECTIONS.LTR).toLowerCase();
const isRTL = () => getDirection() === DIRECTIONS.RTL;
const applyArrayRTLTransform = arr => (isRTL() ? arr.slice(0).reverse() : arr);
const rtlConditionalValue = (ltrValue, rtlValue) => (isRTL() ? rtlValue : ltrValue);

const applyDirectionalRTLTransform = (obj) => {
  if (!isRTL()) {
    return obj;
  }
  const transformedObject = { ...obj };
  transformedObject.left = obj.right;
  transformedObject.right = obj.left;
  return transformedObject;
};

export { applyArrayRTLTransform, rtlConditionalValue, applyDirectionalRTLTransform, isRTL };
