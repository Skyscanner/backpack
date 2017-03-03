import Tether from 'tether';

// We extend tether to hook into the position function in order to expose
// a `position` event on the tether object. Useful for repositioning arrows
// etc. See http://tether.io/advanced/extending_tether/.
Tether.modules.push({
  position(props) {
    this.trigger('position', props);
  },
});

// For compat with various IE browsers who haven't implemented classList yet.
// See http://youmightnotneedjquery.com/#has_class.
const hasClass = (el, className) => {
  if (el.classList) {
    return el.classList.contains(className);
  }

  return new RegExp(`(^| )${className}( |$)`, 'gi').test(el.className);
};

const getArrowPositionCallback = (popoverElement = {}, arrowId, classNamePrefix = 'bpk-popover-tether') => {
  let arrowElement = null;

  if (popoverElement.querySelector) {
    arrowElement = popoverElement.querySelector(`#${arrowId}`);
  }

  if (arrowElement === null) {
    return () => null;
  }

  return (props) => {
    const { top, left, targetPos } = props;

    const shouldApplyLeftOffset =
      hasClass(popoverElement, `${classNamePrefix}-element-attached-top`)
      || hasClass(popoverElement, `${classNamePrefix}-element-attached-bottom`);

    if (shouldApplyLeftOffset) {
      const leftOffset = (targetPos.left + (targetPos.width / 2)) - left;

      arrowElement.style.top = '';
      arrowElement.style.left = `${leftOffset}px`;
    } else {
      const topOffset = (targetPos.top + (targetPos.height / 2)) - top;

      arrowElement.style.top = `${topOffset}px`;
      arrowElement.style.left = '';
    }
  };
};

export default Tether;
export { getArrowPositionCallback };
