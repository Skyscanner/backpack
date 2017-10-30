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
  }} {...props}><path d="M12 22c5.5 0 10-4.5 10-10S17.5 2 12 2 2 6.5 2 12s4.5 10 10 10zM10.5 5.9c0-.5.4-.9.9-.9h1.1c.5 0 .9.4.9.9V13c0 .5-.4.9-.9.9h-1.1c-.5 0-.9-.4-.9-.9V5.9zm0 11.1c0-.5.5-1 1-1h1c.5 0 1 .5 1 1v1c0 .5-.5 1-1 1h-1c-.5 0-1-.5-1-1v-1z" /></svg>;
});