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
  }} {...props}><path d="M20 8h-4c0-2.2-1.8-4-4-4S8 5.8 8 8H4c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-8c0-1.1-.9-2-2-2zm-8-2c1.1 0 2 .9 2 2h-4c0-1.1.9-2 2-2zm3.9 10.5c.2.2.2.5 0 .7l-.7.7c-.2.2-.5.2-.7 0L12 15.4l-2.5 2.5c-.1.1-.5.1-.7 0l-.7-.7c-.1-.2-.1-.6 0-.7l2.5-2.5-2.5-2.5c-.1-.1-.1-.5 0-.7l.7-.7c.2-.1.6-.1.7 0l2.5 2.5 2.5-2.5c.2-.2.5-.2.7 0l.7.7c.2.2.2.5 0 .7L13.4 14l2.5 2.5z" /></svg>;
});