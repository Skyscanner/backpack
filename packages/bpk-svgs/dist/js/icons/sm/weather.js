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
  }} {...props}><path d="M12 8c2.2 0 4 1.8 4 4s-1.8 4-4 4-4-1.8-4-4 1.8-4 4-4zm0-2c-.6 0-1-.4-1-1V3c0-.6.4-1 1-1s1 .4 1 1v2c0 .6-.4 1-1 1zM7.8 7.8c-.4.4-1 .4-1.4 0L4.9 6.3c-.4-.4-.4-1 0-1.4s1-.4 1.4 0l1.4 1.4c.4.4.4 1.1.1 1.5zM6 12c0 .6-.4 1-1 1H3c-.6 0-1-.4-1-1s.4-1 1-1h2c.5 0 1 .4 1 1zm1.7 4.2c.4.4.4 1 0 1.4L6.3 19c-.4.4-1 .4-1.4 0s-.4-1 0-1.4l1.4-1.4c.4-.3 1.1-.3 1.4 0zM12 18c.6 0 1 .4 1 1v2c0 .6-.4 1-1 1s-1-.4-1-1v-2c0-.5.4-1 1-1zm4.2-1.7c.4-.4 1-.4 1.4 0l1.4 1.4c.4.4.4 1 0 1.4s-1 .4-1.4 0l-1.4-1.4c-.4-.4-.4-1.1 0-1.4zM18 12c0-.6.4-1 1-1h2c.6 0 1 .4 1 1s-.4 1-1 1h-2c-.6 0-1-.4-1-1zm-1.8-4.2c-.4-.4-.4-1 0-1.4L17.6 5c.4-.4 1-.4 1.4 0s.4 1 0 1.4l-1.4 1.4c-.3.4-1 .4-1.4 0z" /></svg>;
});