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
  }} {...props}><path d="M12 15a2.951 2.951 0 0 1-1.284-.3L15 10.414V12a3.009 3.009 0 0 1-3 3zm5-6.586v3.866A4.872 4.872 0 0 1 12 17a5.181 5.181 0 0 1-2.784-.8l-1.43 1.43A7.128 7.128 0 0 0 11 18.923V20h-1a2 2 0 0 0-2 2h8a2 2 0 0 0-2-2h-1v-1.077a6.821 6.821 0 0 0 6-6.643V8h-1.586L17 8.414zm3.636-6.465L15 7.586V5a3.009 3.009 0 0 0-3-3 3.009 3.009 0 0 0-3 3v7c.002.445.104.884.3 1.284L7.787 14.8A4.492 4.492 0 0 1 7 12.28V8H5v4.28c0 1.431.475 2.822 1.349 3.956l-4.4 4.4.707.708L21.344 2.656l-.708-.707z" /></svg>;
