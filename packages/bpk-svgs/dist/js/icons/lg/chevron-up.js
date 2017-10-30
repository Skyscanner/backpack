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
  }} {...props}><path d="M12 8.5l7.2 6.4c.6.6.7 1.5.1 2.1-.5.6-1.5.7-2.1.1L12 12.5l-5.2 4.6c-.6.6-1.6.5-2.1-.1s-.5-1.6.1-2.1L12 8.5z" /></svg>;
});