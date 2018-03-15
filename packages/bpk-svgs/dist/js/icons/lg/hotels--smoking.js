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
  }} {...props}><path d="M15.111 13.364V17H4.5a.5.5 0 0 1-.5-.5v-2.636a.5.5 0 0 1 .5-.5h10.611zm1.333 0H19.5a.5.5 0 0 1 .5.5V16.5a.5.5 0 0 1-.5.5h-3.056v-3.636zm.2-6.364h.934c.11 0 .2.09.2.2v4.145a.2.2 0 0 1-.2.2h-.934a.2.2 0 0 1-.2-.2V7.2c0-.11.09-.2.2-.2zm2.223 2.727h.933c.11 0 .2.09.2.2v1.418a.2.2 0 0 1-.2.2h-.933a.2.2 0 0 1-.2-.2V9.927c0-.11.09-.2.2-.2z" /></svg>;
});