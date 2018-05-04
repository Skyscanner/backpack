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
  }} {...props}><path d="M20 5H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zm-7 12H4V7h9v10zm7-6h-5v-1h5v1zm0-2h-5V8h5v1zm-7.5 7h-8c.201-1.29.8-2.251 1.535-2.463l1.291-.372a4.24 4.24 0 0 1 2.348 0l1.291.372c.734.212 1.334 1.173 1.535 2.463zm-6-6a2 2 0 1 1 3.999-.001A2 2 0 0 1 6.5 10z" /></svg>;
});