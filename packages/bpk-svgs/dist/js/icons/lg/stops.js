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
  }} {...props}><path d="M6 8.57A5.93 5.93 0 0 0 4 13v4H2v-4a8 8 0 0 1 4-6.91zm15.65 4.37a1 1 0 0 0-1.41 0L18 15.17V13a8 8 0 0 0-4-6.91v2.48A5.93 5.93 0 0 1 16 13v2.17l-2.23-2.23a1 1 0 0 0-1.41 1.41L17 19l4.65-4.65a1 1 0 0 0 0-1.41zM12 6a2 2 0 1 0-2 2 2 2 0 0 0 2-2z" /></svg>;
});