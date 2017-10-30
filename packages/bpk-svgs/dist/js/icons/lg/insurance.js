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
  }} {...props}><path d="M18.2 3c-2-.7-4.1-1.1-6.2-1-6 0-8 2-8 2v8s0 6 8 10c2.7-1.2 5-3.2 6.6-5.7.2-.3.3-.5.4-.8.6-1.1.9-2.3 1-3.5V4c-.5-.4-1.1-.8-1.8-1zM12 19.7c-5.8-3.3-6-7.6-6-7.7V5.1c1.9-.8 3.9-1.2 6-1.1v15.7z" /></svg>;
});