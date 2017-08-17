import tinycolor from 'tinycolor2';

export default function (value, type) {
  let formattedValue = value;

  switch (type) {
    case 'color': {
      const formattedColor = tinycolor(value);
      formattedValue = `"${formattedColor.toRgbString()}"`;
      break;
    }
    case 'string':
      formattedValue = `"${value.replace(/"/g, '\\"')}"`;
      break;
    default:
      formattedValue = value;
      break;
  }

  return formattedValue;
}
