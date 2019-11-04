import tinycolor from 'tinycolor2';

export default function formatValue(value, type) {
  let formattedValue = value;

  switch (type) {
    case 'color': {
      const formattedColor = tinycolor(value);
      formattedValue = `"${formattedColor.toRgbString()}"`;
      break;
    }
    case 'duration': {
      const parsedDuration = Number.parseInt(value, 10);
      formattedValue = Number.isNaN(parsedDuration) ? value : parsedDuration;
      break;
    }
    case 'string': {
      formattedValue = `"${value.replace(/"/g, '\\"')}"`;
      break;
    }
    case 'semantic': {
      const parsedValues = Object.keys(value).reduce((parsed, tokenKey) => {
        const { value: currValue, type: currType } = value[tokenKey];
        return `${parsed} ${tokenKey}: ${formatValue(currValue, currType)},\n`;
      }, '');
      formattedValue = `{\n${parsedValues}}`;
      break;
    }
    default:
      formattedValue = value;
      break;
  }

  return formattedValue;
}
