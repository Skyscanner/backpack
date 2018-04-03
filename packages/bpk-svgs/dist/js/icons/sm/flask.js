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
  }} {...props}><path d="M19.64 21.28L14.05 10.1a.5.5 0 0 1-.05-.22V2.5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v7.38a.5.5 0 0 1-.05.22L4.36 21.28a.5.5 0 0 0 .45.72h14.38a.5.5 0 0 0 .45-.72zm-3.3-1.61a.75.75 0 0 1-1-.34l-3-6a.75.75 0 0 1 1.34-.67l3 6a.75.75 0 0 1-.35 1.01z" /></svg>;
});