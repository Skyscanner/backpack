const getScriptDirection = () => {
  const html = document.querySelector('html');
  return window.getComputedStyle(html, null).getPropertyValue('direction');
};

export default getScriptDirection;
