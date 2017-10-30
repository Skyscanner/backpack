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
  }} {...props}><path d="M9.4 20c-.5 0-.9-.2-1.3-.5l-5.8-5.1c-.4-.4-.5-1-.1-1.4l1.3-1.5c.4-.4 1-.5 1.4-.1l4 3.5c.2.1.4.1.6 0l9.2-10.5c.4-.4 1-.5 1.4-.1l1.5 1.3c.4.4.5 1 .1 1.4L10.9 19.3c-.4.5-.9.7-1.5.7z" /></svg>;
});