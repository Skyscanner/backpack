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
  }} {...props}><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zM5 12c0-1.4.4-2.7 1.1-3.8l9.7 9.7c-1.1.7-2.4 1.1-3.8 1.1-3.9 0-7-3.1-7-7zm12.9 3.8L8.2 6.1C9.3 5.4 10.6 5 12 5c3.9 0 7 3.1 7 7 0 1.4-.4 2.7-1.1 3.8z" /></svg>;
});