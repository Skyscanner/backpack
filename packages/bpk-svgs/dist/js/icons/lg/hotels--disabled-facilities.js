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
  }} {...props}><path d="M15.136 14.143h-2.565c-.789 0-1.428-.64-1.428-1.429v-5a1.429 1.429 0 0 1 2.857 0v3.572h2.143c.3 0 .58.093.81.251.25.167.45.415.556.723l1.396 4.052a1.429 1.429 0 0 1-2.702.93l-1.067-3.1zM8.109 8.627a1.036 1.036 0 0 1 .941 1.845 4.694 4.694 0 0 0-2.146 2.979 4.714 4.714 0 0 0 6.812 5.21 1.036 1.036 0 0 1 1.172 1.708l.005.008A6.786 6.786 0 0 1 8.107 8.623l.002.004zm4.82-3.056a1.786 1.786 0 1 1 0-3.571 1.786 1.786 0 0 1 0 3.571z" /></svg>;
});