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
  }} {...props}><path d="M18 6H6a2 2 0 0 0-2 2v8a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V8a2 2 0 0 0-2-2zM6 16V8h12v8zm16 1H2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2z" /></svg>;
});