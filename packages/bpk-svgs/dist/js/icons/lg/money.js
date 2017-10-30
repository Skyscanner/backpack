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
  }} {...props}><path d="M20 6v6H4V6h16m1-2H3c-.5 0-1 .5-1 1v8c0 .6.5 1 1 1h18c.6 0 1-.5 1-1V5c0-.5-.5-1-1-1zm-9 3c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm8 10H4c-.6 0-1-.5-1-1v-1h18v1c0 .5-.5 1-1 1zm0 1H4v1c0 .6.5 1 1 1h14c.6 0 1-.5 1-1v-1z" /></svg>;
});