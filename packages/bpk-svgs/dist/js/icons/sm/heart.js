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
  }} {...props}><path d="M19.729 5.272a4.963 4.963 0 0 0-6.993.368 5.735 5.735 0 0 0-.736.919 5.735 5.735 0 0 0-.736-.919 4.963 4.963 0 0 0-6.993-.368 4.971 4.971 0 0 0 .368 6.998l3.68 3.683a41.759 41.759 0 0 1 3.438 3.897l.039.051a.258.258 0 0 0 .407 0l.039-.051a41.759 41.759 0 0 1 3.438-3.897l3.68-3.683a4.971 4.971 0 0 0 .368-6.998z" /></svg>;
});