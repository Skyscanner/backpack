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
  }} {...props}><path d="M22 12c0 .6-.5 1-1 1v1.5c0 .8-.7 1.5-1.5 1.5-.2 0-.3 0-.5-.1V8.1c.2-.1.3-.1.5-.1.8 0 1.5.7 1.5 1.5V11c.5 0 1 .4 1 1zM3 9.5V11c-.5 0-1 .4-1 1s.5 1 1 1v1.5c0 .8.7 1.5 1.5 1.5.2 0 .3 0 .5-.1V8.1C4.8 8 4.7 8 4.5 8 3.7 8 3 8.7 3 9.5zM16 6c-1.1 0-2 .9-2 2v3h-4V8c0-1.1-.9-2-2-2s-2 .9-2 2v8c0 1.1.9 2 2 2s2-.9 2-2v-3h4v3c0 1.1.9 2 2 2s2-.9 2-2V8c0-1.1-.9-2-2-2z" /></svg>;
