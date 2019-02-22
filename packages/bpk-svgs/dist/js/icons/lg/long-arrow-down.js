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
  }} {...props}><path d="M4.5 14.4l5.3 5.7c.4.4.9.7 1.5.8.3.1.5.1.7.1s.4 0 .6-.1c.6-.1 1.1-.4 1.5-.8l5.3-5.7c.8-.8.7-2.1-.1-2.8-.8-.8-2.1-.7-2.8.1L14 14.4V5c0-1.1-.9-2-2-2s-2 .9-2 2v9.4l-2.5-2.7c-.4-.5-1-.7-1.5-.7s-1 .2-1.4.5c-.8.8-.8 2.1-.1 2.9z" /></svg>;
