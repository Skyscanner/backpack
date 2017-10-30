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
  }} {...props}><path d="M4 18h4v2c0 .5-.5 1-1 1H5c-.5 0-1-.5-1-1v-2zm12 2c0 .5.5 1 1 1h2c.5 0 1-.5 1-1v-2h-4v2zm5-8v5H3v-5c0-1.1.9-2 2-2h.2L6 6.6C6.3 5.7 7.3 5 8.4 5H9V3h6v2h.7c1.1 0 2.1.7 2.3 1.6l.7 3.4h.3c1.1 0 2 .9 2 2zM7.2 10h9.7l-.4-2.8c-.1-.3-.4-.5-.8-.5H8.4c-.4 0-.7.2-.8.5L7.2 10zm.8 3.5c0-.8-.7-1.5-1.5-1.5S5 12.7 5 13.5 5.7 15 6.5 15 8 14.3 8 13.5zm11 0c0-.8-.7-1.5-1.5-1.5s-1.5.7-1.5 1.5.7 1.5 1.5 1.5 1.5-.7 1.5-1.5z" /></svg>;
});