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
  }} {...props}><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8zm0-14.7a6.7 6.7 0 1 0 0 13.4 6.7 6.7 0 0 0 0-13.4zm.1.9c.7 0 1.3.6 1.4 1.3 0 .7-.6 1.3-1.3 1.4-.7 0-1.3-.6-1.4-1.3 0-.8.5-1.4 1.3-1.4zm1.3 4.6v2.5l1.2 3.9c.1.2 0 .4-.1.5-.2.1-.4 0-.5-.1l-2-4.3-2 4.2c-.1.2-.4.2-.5.1-.2-.1-.2-.3-.1-.5l1.2-3.8v-2.6L7.2 9.6c-.1-.1-.2-.2-.2-.3 0-.2.1-.3.2-.4h.4l4.4.8 4.4-.7h.2c.2 0 .3.1.4.2.1.2 0 .3-.1.4l-3.5 1.2z" /></svg>;
});