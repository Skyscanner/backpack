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
  }} {...props}><path d="M22 8.941V6.006a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v2.938c.939.008 1.874.45 2.474 1.336a3.006 3.006 0 0 1 0 3.323A3 3 0 0 1 2 14.939v3.055a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-3.053a3.003 3.003 0 0 1-2.497-1.333 3.005 3.005 0 0 1-.001-3.333A3.005 3.005 0 0 1 22 8.941zm-7.378 7.01l-2.472-1.367-2.472 1.367.472-2.894-2-2.05 2.764-.422 1.236-2.633 1.236 2.633 2.764.422-2 2.05.472 2.894z" /></svg>;
});