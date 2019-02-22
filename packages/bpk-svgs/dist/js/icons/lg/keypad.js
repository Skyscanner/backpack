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
  }} {...props}><path d="M4 3h2c.6 0 1 .4 1 1v2c0 .6-.4 1-1 1H4c-.6 0-1-.4-1-1V4c0-.6.4-1 1-1zm7 0h2c.6 0 1 .4 1 1v2c0 .6-.4 1-1 1h-2c-.6 0-1-.4-1-1V4c0-.6.4-1 1-1zm7 0h2c.6 0 1 .4 1 1v2c0 .6-.4 1-1 1h-2c-.6 0-1-.4-1-1V4c0-.6.4-1 1-1zM4 10h2c.6 0 1 .4 1 1v2c0 .6-.4 1-1 1H4c-.6 0-1-.4-1-1v-2c0-.6.4-1 1-1zm7 0h2c.6 0 1 .4 1 1v2c0 .6-.4 1-1 1h-2c-.6 0-1-.4-1-1v-2c0-.6.4-1 1-1zm7 0h2c.6 0 1 .4 1 1v2c0 .6-.4 1-1 1h-2c-.6 0-1-.4-1-1v-2c0-.6.4-1 1-1zM4 17h2c.6 0 1 .4 1 1v2c0 .6-.4 1-1 1H4c-.6 0-1-.4-1-1v-2c0-.6.4-1 1-1zm7 0h2c.6 0 1 .4 1 1v2c0 .6-.4 1-1 1h-2c-.6 0-1-.4-1-1v-2c0-.6.4-1 1-1zm7 0h2c.6 0 1 .4 1 1v2c0 .6-.4 1-1 1h-2c-.6 0-1-.4-1-1v-2c0-.6.4-1 1-1z" /></svg>;
