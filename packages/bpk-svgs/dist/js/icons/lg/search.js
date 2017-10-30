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
  }} {...props}><path d="M20.6 18.4l-4.5-4.5c-.1-.1-.1-.1-.2-.1.7-1.1 1.1-2.4 1.1-3.8 0-3.9-3.1-7-7-7s-7 3.1-7 7 3.1 7 7 7c1.4 0 2.7-.4 3.8-1.1l.1.2 4.5 4.5c.3.3.7.4 1.1.4s.8-.1 1.1-.4c.5-.6.5-1.6 0-2.2zM5 10c0-2.8 2.2-5 5-5s5 2.2 5 5-2.2 5-5 5-5-2.2-5-5z" /></svg>;
});