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
  }} {...props}><path d="M18.1 4.8C16.6 3 14.3 2 12 2S7.5 3 5.9 4.8C3.1 8 3.5 12.6 6.5 16l4.8 5.7c.2.2.4.3.7.3.3 0 .5-.1.7-.3l4.8-5.7c3.1-3.4 3.4-8 .6-11.2zm-4 7.3c-1.2 1.2-3.1 1.2-4.2 0-.6-.6-.9-1.3-.9-2.1 0-1.6 1.3-3 3-3s3 1.3 3 3c0 .8-.3 1.5-.9 2.1z" /></svg>;
});