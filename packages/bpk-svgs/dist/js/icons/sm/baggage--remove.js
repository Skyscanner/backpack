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
  }} {...props}><path d="M20.58 2L16 6.62A4 4 0 0 0 8 7H7v8.58l-2 2V7H4a2 2 0 0 0-2 2v8a2 2 0 0 0 1.62 2L2 20.58l.71.71L21.29 2.71zM12 5a2 2 0 0 1 2 2h-4a2 2 0 0 1 2-2zm8 2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-1V7M7 18.41l10-10V19H7z" /></svg>;
});