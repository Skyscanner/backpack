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
  }} {...props}><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm4.5 9v1c0 .6-.4 1-1 1H13v3.5c0 .6-.4 1-1 1s-1-.4-1-1V13H9.5v3.5c0 .6-.4 1-1 1s-1-.4-1-1v-9c0-.6.4-1 1-1s1 .4 1 1V11H11V7.5c0-.6.4-1 1-1s1 .4 1 1V11h1.5V7.5c0-.6.4-1 1-1s1 .4 1 1V11z" /></svg>;
});