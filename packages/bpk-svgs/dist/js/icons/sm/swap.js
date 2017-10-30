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
  }} {...props}><path d="M9.1 11.2V9.5H15c.8 0 1.5-.7 1.5-1.5s-.7-1.5-1.5-1.5H9.1V4.8c0-.6-.6-.9-1.1-.7L2.4 7.3c-.5.3-.5 1 0 1.3L8 11.9c.5.3 1.1-.1 1.1-.7zm12.5 4.1L16 12.1c-.5-.3-1.1.1-1.1.7v1.7H9c-.8 0-1.5.7-1.5 1.5s.7 1.5 1.5 1.5h5.9v1.7c0 .6.6.9 1.1.7l5.6-3.2c.5-.3.5-1.1 0-1.4z" /></svg>;
});