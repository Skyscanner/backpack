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
  }} {...props}><path d="M2 18h20c0 1.1-1.9 2-3 2H5c-1.1 0-3-.9-3-2zM22 7v2.9c0 2.2-1.8 4.1-4 4.2v.1c0 1.6-1.3 2.9-2.9 2.9H8.9C7.3 17 6 15.7 6 14.1V4h12v1h2c1.1 0 2 .9 2 2zm-8.6 3.5L15.9 8c.2-.2.2-.5 0-.7l-.7-.7c-.2-.2-.5-.2-.7 0L12 9.1 9.5 6.6c-.1-.1-.5-.1-.7 0l-.7.7c-.1.2-.1.6 0 .7l2.5 2.5L8.1 13c-.2.2-.2.5 0 .7l.7.7c.2.2.5.2.7 0l2.5-2.5 2.5 2.5c.2.2.5.2.7 0l.7-.7c.2-.2.2-.5 0-.7 0-.1-2.5-2.5-2.5-2.5zM20 7h-2v5c1.1-.1 2-1 2-2.2V7z" /></svg>;
});