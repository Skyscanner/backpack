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
  }} {...props}><path d="M10 19.1h4.8c-.6 1.5-2.3 2.3-3.9 1.7-.8-.3-1.4-.9-1.7-1.7h.8zm8-8c0-2.5-1.6-4.8-4-5.7.2-1.1-.5-2.1-1.6-2.3-1.1-.2-2.1.5-2.3 1.6v.7C7.7 6.2 6 8.5 6 11v3l-2 3h16l-2-3v-2.9z" /></svg>;
});