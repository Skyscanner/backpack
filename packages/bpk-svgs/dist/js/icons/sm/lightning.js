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
  }} {...props}><path d="M17.2 10h-3.4L16 3.3c.2-.5-.1-1.1-.6-1.3H9.3c-.5 0-.9.3-1 .8l-2.5 10c-.1.5.2 1 .7 1.2h4l-1.6 7.3c-.1.6.5.9.9.5l8.2-10c.6-.7.1-1.8-.8-1.8z" /></svg>;
});