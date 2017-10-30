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
  }} {...props}><path d="M13 7v4.9c0 .6.5 1.1 1.1 1.1h.9v7.5c0 .8.7 1.5 1.5 1.5s1.5-.7 1.5-1.5V2.9c0-.5-.4-.9-.9-.8C14.8 2.5 13 4.6 13 7zM6 8.2c0 .7.4 1.3 1 1.6v10.7c0 .8.7 1.5 1.5 1.5s1.5-.7 1.5-1.5V9.8c.6-.3 1-.9 1-1.6V2.5c0-.3-.2-.5-.5-.5s-.5.2-.5.5v5c0 .3-.2.5-.5.5S9 7.8 9 7.5v-5c0-.3-.2-.5-.5-.5s-.5.2-.5.5v5c0 .3-.2.5-.5.5S7 7.8 7 7.5v-5c0-.3-.2-.5-.5-.5s-.5.2-.5.5v5.7z" /></svg>;
});