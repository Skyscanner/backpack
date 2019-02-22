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
  }} {...props}><path d="M8 5c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm10-2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM3 11v11h2v-6.9h2V22h2V9H5c-1.1 0-2 .9-2 2zm12-2v13h2v-6.9h2V22h2V11c0-1.1-.9-2-2-2h-4zm-1 3c0-1.1-.9-2-2-2s-2 .9-2 2 .9 2 2 2 2-.9 2-2zm0 3h-4v7h4v-7zM-23.373 1.96l1.414 1.413-18.668 18.668-1.414-1.414z" /><path d="M-23.373 1.894l.707.707-18.668 18.667-.707-.707z" /></svg>;
