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
  }} {...props}><path d="M14.8 12l4.9-4.9c.4-.4.4-1 0-1.4l-1.4-1.4c-.4-.4-1-.4-1.4 0L12 9.2l-4.9-5c-.4-.4-1-.4-1.4 0L4.2 5.6c-.4.4-.4 1 0 1.4l5 5-4.9 4.9c-.4.4-.4 1 0 1.4l1.4 1.4c.4.4 1 .4 1.4 0l4.9-4.9 4.9 4.9c.4.4 1 .4 1.4 0l1.4-1.4c.4-.4.4-1 0-1.4L14.8 12z" /></svg>;
});