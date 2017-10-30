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
  }} {...props}><path d="M20.8 5l-5.2 1.1c-.7.1-.9 1-.3 1.6l.9 1-3 3H8.1c-.4 0-.8.2-1.1.4l-4.6 4.6c-.6.6-.6 1.5 0 2.1.6.6 1.5.6 2.1 0l4.1-4.1h5.2c.4 0 .8-.2 1.1-.4l3.4-3.4 1 1c.5.6 1.4.4 1.6-.3L22 6.2c.1-.7-.5-1.3-1.2-1.2z" /></svg>;
});