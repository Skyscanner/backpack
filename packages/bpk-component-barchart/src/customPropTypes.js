export default (props, propName, componentName) => {
  const { xScaleDataKey, yScaleDataKey } = props;
  const data = props[propName];
  if (!Array.isArray(data)) {
    return new Error(`Invalid prop ${propName} supplied to ${componentName}. Should be an array`);
  }

  for (let i = 0; i < data.length; i += 1) {
    const object = data[i];
    const valid = Object.prototype.hasOwnProperty.call(object, xScaleDataKey) &&
                  Object.prototype.hasOwnProperty.call(object, yScaleDataKey);
    if (!valid) {
      return new Error(`Invalid prop ${propName} supplied to ${componentName}.` +
        `Value ${JSON.stringify(object)} should contain keys '${xScaleDataKey}' and '${yScaleDataKey}'`);
    }
  }

  return null;
};
