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
  }} {...props}><path d="M5 20h14c1.1 0 3-.9 3-2H2c0 1.1 1.9 2 3 2zM20 5h-2V4H6v10.1C6 15.7 7.3 17 8.9 17h6.2c1.6 0 2.9-1.3 2.9-2.9V14c2.2-.1 4-1.9 4-4.2V7c0-1.1-.9-2-2-2zm0 4.8c0 1.1-.9 2.1-2 2.2V7h2v2.8z" /></svg>;
});