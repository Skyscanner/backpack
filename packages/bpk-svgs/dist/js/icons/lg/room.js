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
  }} {...props}><path d="M11.6 2c-2.4.2-4.1 2.4-4.1 4.7v.1c0 .3.3.6.6.6h1.2c.4 0 .6-.3.6-.7v.1c0-.9.6-1.7 1.5-1.7.9-.1 1.7.4 1.9 1.3.2.9-.3 1.9-1.3 2.1-.1 0-.3.1-.4.1H8.5c-.6 0-1 .4-1 1V21c0 .6.4 1 1 1h7c.6 0 1-.5 1-1V6.5C16.5 4 14.5 2 12 2h-.4z" /></svg>;
});