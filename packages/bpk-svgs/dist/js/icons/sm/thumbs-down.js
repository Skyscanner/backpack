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
  }} {...props}><path d="M3.05 14.71l2.53-7.28A2 2 0 0 1 7.5 6H14a1 1 0 0 1 1 1v7l-2.48 5.79A2 2 0 0 1 10.69 21h-.46a1 1 0 0 1-1-1.2L10 16H4a1 1 0 0 1-.95-1.29zM16 14h3V6h-3z" /></svg>;
});