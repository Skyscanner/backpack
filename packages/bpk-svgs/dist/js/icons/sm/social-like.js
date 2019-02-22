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
  }} {...props}><path d="M18.2 3C21 3 21 4.1 21 5.9V14c0 2.4-.5 2.9-2.8 2.9h-3.6L12 21l-2.5-4H5.8C3.3 17 3 16.4 3 13.7V5.9C3 4 3.1 3 5.8 3h12.4zm-5.3 3.6c-.4.3-.6.6-.9 1 0 .1-.1.1-.1 0-.2-.4-.5-.8-.9-1.1-.9-.7-2.4-.5-3.2.5-.9 1.1-.8 2.8.2 3.8l3.7 4.1c.2.2.5.2.7 0l3.7-4.1c.9-1 1-2.7.1-3.7-.8-1.1-2.2-1.3-3.3-.5z" /></svg>;
