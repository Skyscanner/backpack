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
  }} {...props}><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zM9.5 16.2c0 .3-.2.5-.5.5H8c-.3 0-.5-.2-.5-.5v-1c0-.3.2-.5.5-.5h1c.3 0 .5.2.5.5v1zm0-4c0 .3-.2.5-.5.5H8c-.3 0-.5-.2-.5-.5v-1c0-.3.2-.5.5-.5h1c.3 0 .5.2.5.5v1zm0-4c0 .3-.2.5-.5.5H8c-.3 0-.5-.2-.5-.5v-1c0-.2.2-.5.5-.5h1c.3 0 .5.2.5.5v1zm7 2.5c0 .6-.5 1-1 1h-1v5c0 .5-.4 1-1 1s-1-.5-1-1v-5h-1c-.6 0-1-.4-1-1v-1c0-.6.4-1 1-1h1v-2c0-.6.4-1 1-1s1 .4 1 1v2h1c.5 0 1 .4 1 1v1zm-1-.5c0 .3-.2.5-.5.5h-3c-.3 0-.5-.2-.5-.5s.2-.5.5-.5h3c.3 0 .5.3.5.5z" /></svg>;
});