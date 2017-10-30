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
  }} {...props}><path d="M12.5 11.3c.4.4 1 .4 1.4 0L19 6.2V9c0 .6.4 1 1 1s1-.4 1-1V4c0-.6-.4-1-1-1h-5c-.6 0-1 .4-1 1s.4 1 1 1h2.4l-4.9 4.9c-.4.4-.4 1 0 1.4zM19 19c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V7c0-1.1.9-2 2-2h7v2H5v12h12v-7h2" /></svg>;
});