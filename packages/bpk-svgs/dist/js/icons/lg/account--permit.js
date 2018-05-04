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
  }} {...props}><path d="M18 2H6a2 2 0 0 0-2 2v18l8-4 8 4V4a2 2 0 0 0-2-2zm-7.515 12.929l-3.707-3.861L8.22 9.683l2.293 2.389 5.278-5.278 1.414 1.414-6.72 6.721z" /></svg>;
});