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
  }} {...props}><path d="M12.5 7l1.3 2.6 2.9.4c.3 0 .5.3.4.6 0 .1-.1.2-.1.3l-2.1 2 .5 2.9c0 .3-.1.5-.4.6h-.3L12 14.9l-2.6 1.3c-.2.1-.5 0-.7-.2 0-.1-.1-.2 0-.3l.5-2.9-2.1-2c-.2-.2-.2-.5 0-.7.1-.1.2-.1.3-.1l2.9-.4L11.6 7c.1-.2.4-.3.7-.2 0 .1.1.1.2.2zm8.7 5c0 .9 1 1.9.7 2.7-.2.8-1.5 1.2-2 1.9-.4.7-.1 2.1-.7 2.7-.6.6-1.9.3-2.7.7-.7.4-1.1 1.7-1.9 2-.8.2-1.8-.7-2.7-.7s-1.9 1-2.7.7c-.8-.2-1.2-1.5-1.9-2-.7-.4-2.1-.1-2.7-.7-.6-.6-.3-1.9-.7-2.7-.4-.7-1.7-1.1-2-1.9-.2-.8.7-1.8.7-2.7s-1-1.9-.7-2.7c.2-.8 1.5-1.2 2-1.9.4-.7.1-2.1.7-2.7.7-.6 2-.3 2.8-.7.7-.4 1.1-1.7 1.9-2 .8-.2 1.8.7 2.7.7s1.9-1 2.7-.7c.8.2 1.2 1.5 1.9 2 .7.4 2.1.1 2.7.7.6.6.3 1.9.7 2.7.4.7 1.7 1.1 2 1.9.2.8-.8 1.8-.8 2.7zM19 12c0-3.9-3.1-7-7-7s-7 3.1-7 7 3.1 7 7 7 7-3.1 7-7z" /></svg>;
});