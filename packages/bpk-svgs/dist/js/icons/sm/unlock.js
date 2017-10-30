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
  }} {...props}><path d="M17 10.027V5.982a4 4 0 0 0-4-4h-2a4 4 0 0 0-4 4v1.036h2V5.982a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v4.036H6.95a2.165 2.165 0 0 0-2 2.1v7.7a2.22 2.22 0 0 0 2.2 2.2h9.7a2.22 2.22 0 0 0 2.2-2.2v-7.7A2.342 2.342 0 0 0 17 10.027z" /></svg>;
});