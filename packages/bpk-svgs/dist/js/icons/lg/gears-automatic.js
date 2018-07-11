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
  }} {...props}><path d="M10 12h4v8a2 2 0 1 1-4 0v-8zm9-4v2a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h4V4a2 2 0 1 1 4 0v3h4a1 1 0 0 1 1 1zm-1 0H6v1h12V8zm0-3h-2v1h2V5zm-2 9h2v-1h-2v1zm0 3h2v-1h-2v1zm0 3h2v-1h-2v1z" /></svg>;
});