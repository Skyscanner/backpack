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
  }} {...props}><path d="M12 2c1.7 0 3 1.3 3 3v7c0 1.7-1.3 3-3 3s-3-1.3-3-3V5c0-1.7 1.3-3 3-3zm5 6v4.3c-.1 2.7-2.3 4.8-5 4.7-2.7.1-4.9-2-5-4.7V8H5v4.3c.1 3.4 2.6 6.2 6 6.6V20h-1c-1.1 0-2 .9-2 2h8c0-1.1-.9-2-2-2h-1v-1.1c3.4-.4 5.9-3.2 6-6.6V8h-2z" /></svg>;
