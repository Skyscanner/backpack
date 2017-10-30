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
  }} {...props}><path d="M20.7 7.05l-8.42-4a.67.67 0 0 0-.57 0L3.31 7c-.54.3-.31 1 .28 1H20.4c.6 0 .83-.69.3-.95zM3 18h18v2H3zm2-9h2v8H5zm4 0h2v8H9zm4 0h2v8h-2zm4 0h2v8h-2z" /></svg>;
});