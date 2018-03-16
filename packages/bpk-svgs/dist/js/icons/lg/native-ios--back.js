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
  }} {...props}><path d="M7.003 12.166a1.25 1.25 0 0 1 .393-.997l7.302-6.832a1.25 1.25 0 0 1 1.708 1.826L9.99 12.166l6.416 6.003a1.25 1.25 0 1 1-1.708 1.826l-7.302-6.832a1.248 1.248 0 0 1-.393-.997z" /></svg>;
});