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
  }} {...props}><path d="M19.1 13.3L13.8 12l5.3-1.3c1.6-.4 2.4-2.3 1.6-3.7-.8-1.5-2.8-1.7-4-.5l-3.8 4 1.5-5.2C14.9 3.6 13.7 2 12 2S9.1 3.6 9.6 5.2l1.6 5.2-3.8-4c-1.2-1.2-3.2-1-4 .5s0 3.3 1.6 3.7l5.3 1.3L5 13.2c-1.6.4-2.4 2.3-1.6 3.7.8 1.5 2.8 1.7 4 .5l3.8-4-1.5 5.2c-.6 1.8.6 3.4 2.3 3.4s2.9-1.6 2.4-3.2l-1.6-5.2 3.8 4c1.2 1.2 3.2 1 4-.5.9-1.6.1-3.4-1.5-3.8z" /></svg>;
});