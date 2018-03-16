function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import React from "react";
export default ((_ref) => {
  let {
    styles = {}
  } = _ref,
      props = _objectWithoutProperties(_ref, ["styles"]);

  return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" style={{
    width: "1.5rem",
    height: "1.5rem"
  }} {...props}><path d="M13.238 12l4.506 4.506a.875.875 0 1 1-1.238 1.238L12 13.238l-4.506 4.506a.875.875 0 0 1-1.238-1.238L10.763 12 6.256 7.494a.875.875 0 1 1 1.238-1.238L12 10.763l4.506-4.505a.875.875 0 0 1 1.238 1.237L13.238 12z" /></svg>;
});