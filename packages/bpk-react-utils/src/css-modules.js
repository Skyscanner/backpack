export default (styles = {}) =>
  className => (styles[className] ? styles[className] : className);
