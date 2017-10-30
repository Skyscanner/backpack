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
  }} {...props}><path d="M20 8H4c-.6 0-1-.4-1-1s.4-1 1-1h16c.6 0 1 .4 1 1s-.4 1-1 1zm1 4c0-.6-.4-1-1-1H4c-.6 0-1 .4-1 1s.4 1 1 1h16c.6 0 1-.4 1-1zm0 5c0-.6-.4-1-1-1H4c-.6 0-1 .4-1 1s.4 1 1 1h16c.6 0 1-.4 1-1z" /></svg>;
});