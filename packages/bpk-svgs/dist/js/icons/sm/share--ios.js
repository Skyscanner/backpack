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
  }} {...props}><path d="M20 9v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9h2v10.75a.25.25 0 0 0 .25.25h11.5a.25.25 0 0 0 .25-.25V9zm-9-3v10h2V6l2.5 2.5L17 7l-5-5-5 5 1.5 1.5z" /></svg>;
});