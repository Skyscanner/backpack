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
  }} {...props}><path d="M14.3 15.8c1.4 1.1 3.9 3 4.8 3.8.3.3.7.3 1 0 .3-.3.3-.7 0-1-.6-.7-2.6-3.3-3.8-4.8l4.4-4.4c.4-.4.1-.7-.1-.8-.9-.8-2.4-.8-4.1 0 0 0-.1 0-.1-.1-2.2-1.6-4.3-3.2-6.5-4.8l.2-.2c.4-.4.4-.9 0-1.3L10 2c-.3-.3-.9-.3-1.3 0L2.8 8c-.4.4-.4.9 0 1.3l.1.1c.4.4.9.4 1.3 0l.3-.3 4.8 6.6c-.7 1.8-.8 3.4.1 4.2.1.1.4.4.8 0l4.1-4.1z" /></svg>;
});