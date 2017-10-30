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
  }} {...props}><path d="M12 17.6V3c-.3 0-.6.2-.8.5L9 8c-.1.3-.4.4-.7.5l-4.5.7c-.7.1-1 1-.5 1.5l3.8 3.5c.2.2.3.5.3.8l-1.5 5c-.1.7.6 1.3 1.3.9l4.8-3.3z" /></svg>;
});