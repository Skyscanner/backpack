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
  }} {...props}><path d="M8 5c-.6 0-1-.4-1-1 0-.5.4-1 1-1 .5 0 1 .4 1 1s-.4 1-1 1zm9-1c0-.6-.4-1-1-1-.5 0-1 .4-1 1 0 .5.4 1 1 1s1-.4 1-1zm4 1v13c0 1.7-1.3 3-3 3H6c-1.7 0-3-1.3-3-3V5c0-.6.4-1 1-1h1c.6 0 1 .4 1 1s.4 1 1 1h2c.5 0 1-.4 1-1s.4-1 1-1h2c.6 0 1 .4 1 1s.4 1 1 1h2c.5 0 1-.4 1-1s.4-1 1-1h1c.6 0 1 .4 1 1zm-2 5H5v8c0 .6.4 1 1 1h12c.6 0 1-.4 1-1v-8zm-8 2H7v4h4v-4z" /></svg>;
});