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
  }} {...props}><path d="M5 12V3H3v9a5 5 0 0 0 5 5h6v-2H8a3 3 0 0 1-3-3zm15.5 6H19v-7a2.006 2.006 0 0 0-2-2h-5V3H6v8a3.009 3.009 0 0 0 3 3h7v7h4.5a1.5 1.5 0 0 0 0-3z" /></svg>;
});