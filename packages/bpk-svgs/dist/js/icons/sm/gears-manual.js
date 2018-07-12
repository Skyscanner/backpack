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
  }} {...props}><path d="M20 6.758v6.278h-7v4.277a2 2 0 1 1-2 0v-4.277H6v4.277a2 2 0 1 1-2 0V6.758a2 2 0 1 1 2 0v4.028h5V6.758a2 2 0 1 1 2 0v4.028h5V6.758a2 2 0 1 1 2 0z" /></svg>;
});