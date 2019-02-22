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
  }} {...props}><path d="M3.3 14.6c-.5-1.1-.4-2.4.4-3.3L9.9 4c.7-.9 2-1.2 3.1-.9L3.3 14.6zM9 17c-1.1 0-2 .9-2 2s.9 2 2 2h.1c1.1 0 2-.9 2-2-.2-1.1-1-2-2.1-2zM21 5.3c0-.3-.2-.6-.4-.9l-1.2-1.1c-.3-.3-.8-.3-1.1.1-.3.3-.2.8.1 1.1l.9.8-1.6 1.8L14.4 4l-10 12 1.8 1.6c.5-1.1 1.6-1.9 2.8-1.9 1 0 1.9.5 2.5 1.3l9.2-10.7c.2-.3.3-.7.3-1z" /></svg>;
