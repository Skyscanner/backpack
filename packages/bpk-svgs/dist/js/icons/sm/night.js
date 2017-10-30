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
  }} {...props}><path d="M15.1 14.9c-3-.5-5.5-3-6-6-.4-2.5.3-4.7 1.8-6.4.1-.2 0-.4-.2-.4-5.1.7-8.9 5.1-8.7 10.4.2 5.1 4.4 9.3 9.5 9.5 5.3.2 9.7-3.6 10.4-8.7 0-.2-.2-.4-.4-.2-1.6 1.4-3.9 2.2-6.4 1.8z" /></svg>;
});