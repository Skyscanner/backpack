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
  }} {...props}><path d="M16 2H4.5c-.3 0-.5.2-.5.5v19c0 .3.2.5.5.5H16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-5 15c-1.7 0-3-1.3-3-3s1.3-3 3-3 3 1.3 3 3-1.3 3-3 3zM9 8V7h4v1H9zm5-2H8V5h6v1zm6-2v16c0 1.1-.9 2-2 2 0-.2.1-.3.2-.4.5-.4.8-.9.8-1.6V4c0-.6-.3-1.2-.8-1.6-.1-.1-.2-.2-.2-.4 1.1 0 2 .9 2 2z" /></svg>;
});