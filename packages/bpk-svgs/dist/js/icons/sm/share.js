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
  }} {...props}><path d="M13.83 3.12a.5.5 0 0 0-.83.38v3.84a13.18 13.18 0 0 0-5.1 1.89 10.49 10.49 0 0 0-3.39 3.62A13 13 0 0 0 3.13 17 15.38 15.38 0 0 0 3 21v-.14a12.66 12.66 0 0 1 1-2.47 11 11 0 0 1 3.58-3.76 10.57 10.57 0 0 1 2.82-1.33 22.69 22.69 0 0 1 2.6-.64v3.84a.5.5 0 0 0 .84.37L21 10z" /></svg>;
});