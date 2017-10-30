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
  }} {...props}><path d="M19.5 9.6l-5.3-5.7c-.4-.4-.9-.7-1.5-.8-.3-.1-.5-.1-.7-.1s-.4 0-.6.1c-.6.1-1.1.4-1.5.8L4.5 9.6c-.8.8-.7 2.1.1 2.8.8.8 2.1.7 2.8-.1L10 9.6V19c0 1.1.9 2 2 2s2-.9 2-2V9.6l2.5 2.7c.4.4.9.6 1.5.6.5 0 1-.2 1.4-.5.8-.7.8-2 .1-2.8z" /></svg>;
});