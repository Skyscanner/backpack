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
  }} {...props}><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm4.8 12.9c.3.3.3.7 0 .9l-.9.9c-.3.3-.7.3-.9 0l-3-2.8-2.9 2.9c-.3.3-.7.3-.9 0l-.9-.9c-.3-.3-.3-.7 0-.9l2.9-2.9-3-3c-.3-.3-.3-.7 0-.9l.9-.9c.3-.3.7-.3.9 0l2.9 2.9 2.9-2.9c.3-.3.7-.3.9 0l.9.9c.3.3.3.7 0 .9L13.9 12l2.9 2.9z" /></svg>;
