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
  }} {...props}><path d="M8.5 17.6h9.6l3.8-10c.2-.5-.1-1-.6-1h-1.2c-.5 0-.9.2-1.2.5L8.5 17.6zM14 9.4c.2-.4-.1-.8-.6-.8h-1.1c-.4 0-.8.1-1.1.4L2 17.6h5.5l5.2-5.3L14 9.4z" /></svg>;
});