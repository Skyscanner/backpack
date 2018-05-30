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
  }} {...props}><path d="M12 2c5.522 0 10 4.477 10 10s-4.478 10-10 10C6.477 22 2 17.523 2 12a9.968 9.968 0 0 1 2.953-7.093c.165.617.406 1.34.735 2.195a8.015 8.015 0 0 0-1.5 3.173c-.021.099-.19.872-.188 1.725.006 2.724 1.747 4.947 2.308 5.616.588.56 2.706 2.435 5.692 2.384 3.843-.066 8-3.302 8-8 0-4.411-3.589-8-8-8-.405 0-.799.04-1.187.098a24.048 24.048 0 0 0-1.508-1.72A9.979 9.979 0 0 1 12 2zm1.581 9.317a1.75 1.75 0 0 1-3.029 1.749s-4.63-9.587-3.794-10.07c.836-.483 6.823 8.32 6.823 8.32z" /></svg>;
});