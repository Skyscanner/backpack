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
  }} {...props}><path d="M12 9.172l4.243-4.243a2 2 0 1 1 2.828 2.828L14.828 12l4.243 4.243a2 2 0 1 1-2.828 2.828L12 14.828l-4.243 4.243a2 2 0 1 1-2.828-2.828L9.172 12 4.929 7.757A2 2 0 1 1 7.757 4.93L12 9.172z" /></svg>;
});