import { StyleSheet } from 'react-native';

export const stylePropType = (props, propName, componentName) => {
  const value = StyleSheet.flatten(props[propName]);

  if (value === undefined) return false;

  if (value.fontWeight) {
    return new Error(`Invalid prop \`${propName}\` with \`fontWeight\` value \`${value.fontWeight}\` supplied to \`${componentName}\`. Use \`emphasize\` prop instead.`); // eslint-disable-line max-len
  }

  return false;
};

export const dismissablePropType = (props, propName, componentName) => {
  if (props[propName] && props.children !== null) {
    return new Error(`Invalid prop \`${propName}\` with value \`${props[propName]}\` supplied to \`${componentName}\`. Banner alert cannot be expanded to show children if it is dismissable.`); // eslint-disable-line max-len
  }

  return false;
};

export default { stylePropType, dismissablePropType };
