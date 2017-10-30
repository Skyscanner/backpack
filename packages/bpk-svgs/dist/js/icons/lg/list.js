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
  }} {...props}><path d="M4 8c-1.1 0-2-.9-2-2s.8-2 2-2c-.1 0 0 0 0 0 1.1 0 2 .9 2 2-.1 1.1-.9 2-2 2zm2 4c0-1.1-.8-2-2-2s-2 .8-2 2v.1c0 1.1.9 2 2 2 1.1-.2 2-1 2-2.1zm0 6c0-1.1-.8-2-2-2s-2 .8-2 2v.1c0 1.1.9 2 2 2 1.1-.2 2-1 2-2.1zm5-10h10c.6 0 1-.4 1-1V5c0-.6-.4-1-1-1H11c-.6 0-1 .4-1 1v2c0 .6.4 1 1 1zm0 6h10c.6 0 1-.4 1-1v-2c0-.6-.4-1-1-1H11c-.6 0-1 .4-1 1v2c0 .6.4 1 1 1zm0 6h10c.6 0 1-.4 1-1v-2c0-.6-.4-1-1-1H11c-.6 0-1 .4-1 1v2c0 .6.4 1 1 1z" /></svg>;
});