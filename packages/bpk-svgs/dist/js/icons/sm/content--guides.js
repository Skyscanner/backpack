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
  }} {...props}><path d="M2 4h4.913c1.72 0 3.37.719 4.587 2v12l-1.9-1H2V4zm1 15h8l-2-1H3v1zm18-1h-6l-2 1h8v-1zm1-14v13h-7.6l-1.9 1V6c1.217-1.281 2.867-2 4.587-2H22zm-2 7h-5v1h5v-1zm0-2h-5v1h5V9zm0-2h-5v1h5V7z" /></svg>;
});