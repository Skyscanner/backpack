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
  }} {...props}><path d="M11.479 13.935l2.493-2.493a1.953 1.953 0 0 1 .1.594 2.006 2.006 0 0 1-2 2 1.953 1.953 0 0 1-.593-.101zm10.294-3a11.3 11.3 0 0 0-3.873-3.42l-2.434 2.433a3.95 3.95 0 0 1 .607 2.088 4.012 4.012 0 0 1-4 4 3.952 3.952 0 0 1-2.088-.607l-1.926 1.926a12.3 12.3 0 0 0 4.014.681 11.8 11.8 0 0 0 9.7-4.9 2.167 2.167 0 0 0 0-2.2zm-.429-8.28L2.656 21.344l-.707-.708 4.161-4.161a11.3 11.3 0 0 1-3.737-3.339 1.8 1.8 0 0 1 0-2.2 11.8 11.8 0 0 1 9.7-4.9 12.308 12.308 0 0 1 3.847.629l4.716-4.716zM14.02 8.566a3.933 3.933 0 0 0-1.947-.53 4.012 4.012 0 0 0-4 4 3.943 3.943 0 0 0 .53 1.946l1.519-1.519a1.988 1.988 0 0 1 1.951-2.427 1.95 1.95 0 0 1 .428.049z" /></svg>;
