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
  }} {...props}><path d="M16.57 5a3.428 3.428 0 0 1 2.452.979 3.981 3.981 0 0 1-.368 5.584l-3.68 3.683a42.936 42.936 0 0 0-2.973 3.302 42.944 42.944 0 0 0-2.973-3.302l-3.68-3.683a3.981 3.981 0 0 1-.368-5.584A3.428 3.428 0 0 1 7.432 5a4.481 4.481 0 0 1 3.126 1.347 4.734 4.734 0 0 1 .607.761l.836 1.275.836-1.275a4.733 4.733 0 0 1 .607-.76 4.481 4.481 0 0 1 3.126-1.347m0-1a5.46 5.46 0 0 0-3.834 1.64A5.734 5.734 0 0 0 12 6.56a5.734 5.734 0 0 0-.736-.919 5.461 5.461 0 0 0-3.834-1.64 4.415 4.415 0 0 0-3.159 1.272 4.971 4.971 0 0 0 .368 6.998l3.68 3.683a41.76 41.76 0 0 1 3.438 3.897l.039.051a.258.258 0 0 0 .407 0l.039-.051a41.759 41.759 0 0 1 3.438-3.897l3.68-3.683a4.971 4.971 0 0 0 .368-6.998 4.415 4.415 0 0 0-3.159-1.272z" /></svg>;
});