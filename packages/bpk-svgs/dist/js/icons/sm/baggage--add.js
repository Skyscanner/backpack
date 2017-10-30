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
  }} {...props}><path d="M13 16.5a5.51 5.51 0 0 1 4-5.29V7h-1a4 4 0 1 0-8 0H7v12h6.61a5.46 5.46 0 0 1-.61-2.5zM12 5a2 2 0 0 1 2 2h-4a2 2 0 0 1 2-2zm7 6V7h1a2 2 0 0 1 2 2v3.26A5.47 5.47 0 0 0 19 11zM4 7h1v12H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2zm14.5 6a3.5 3.5 0 1 0 3.5 3.5 3.5 3.5 0 0 0-3.5-3.5zm.5 4v2h-1v-2h-2v-1h2v-2h1v2h2v1z" /></svg>;
});