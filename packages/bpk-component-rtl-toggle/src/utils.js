const DIRECTIONS = {
  LTR: 'ltr',
  RTL: 'rtl',
};

const DIRECTION_CHANGE_EVENT = 'bpkchangedirection';

const getHtmlElement = () => (typeof document !== 'undefined' ? document.querySelector('html') : {});

export {
  DIRECTIONS,
  DIRECTION_CHANGE_EVENT,
  getHtmlElement,
};
