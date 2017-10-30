function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import React from "react";
export default ((_ref) => {
  let {
    styles = {}
  } = _ref,
      props = _objectWithoutProperties(_ref, ["styles"]);

  return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" style={{
    width: "1.125rem",
    height: "1.125rem"
  }} {...props}><path d="M20.7 7.7c-.4-.4-1-.4-1.4 0l-3.2 3.2-2.8-2.8 3.2-3.2c.4-.4.4-1 0-1.4s-1-.4-1.4 0l-3.2 3.2-1.4-1.4-4.3 4.2c-1.6 1.6-1.6 4.1 0 5.7L3.4 18l2.8 2.8L9 18c1.6 1.6 4.1 1.6 5.7 0l4.2-4.2-1.4-1.4 3.2-3.2c.4-.5.4-1.1 0-1.5z" /></svg>;
});