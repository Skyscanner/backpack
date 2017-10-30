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
  }} {...props}><path d="M12.5 8.6h-1.3v3.1h1.3c1.2 0 1.8-.6 1.8-1.7s-.7-1.4-1.8-1.4zM12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm.6 12.2h-1.5v2.2c0 .9-.7 1.6-1.6 1.6-.8 0-1.5-.7-1.5-1.6V7.1c0-.6.4-1 1-1h3.6c2.6 0 4.8 1 4.8 4 0 2.9-2.3 4.1-4.8 4.1z" /></svg>;
});