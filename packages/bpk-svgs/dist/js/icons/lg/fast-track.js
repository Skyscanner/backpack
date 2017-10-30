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
  }} {...props}><path d="M13 21c.5 0 1.1-.2 1.5-.6l5.5-5.7c1.4-1.5 1.4-3.8 0-5.3l-5.5-5.7c-.7-.7-2-.8-2.8-.2-.8.7-.9 1.8-.2 2.5l5.5 5.7c.1.1.1.4 0 .5L11.5 18c-.7.7-.6 1.9.2 2.5.3.4.8.5 1.3.5zm-6.7-1.9l4.3-4.5c1.4-1.5 1.4-3.8 0-5.3L6.3 4.9c-.8-.8-2-.8-2.7-.1s-.8 1.9-.1 2.7l4.1 4.3c.1.2.1.4 0 .5l-4.1 4.3c-.7.7-.8 1.9 0 2.7.7.6 1.9.6 2.8-.2-.1.1-.1.1 0 0z" /></svg>;
});