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
  }} {...props}><path d="M20.97 19.2A1.507 1.507 0 0 1 19.5 21H15v-3l1-4h-6a3.009 3.009 0 0 1-3-3V3h6v6h5a2.006 2.006 0 0 1 2 2l-2 7h1.44a1.539 1.539 0 0 1 1.53 1.2zM6 12V3H4v9a5 5 0 0 0 5 5h4v-2H9a3 3 0 0 1-3-3z" /></svg>;
});