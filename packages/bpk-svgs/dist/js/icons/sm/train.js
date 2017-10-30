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
  }} {...props}><path d="M17 18.4v-1c1.2-.7 2-2 2-3.4V6c0-2.2-1.8-4-4-4H9C6.8 2 5 3.8 5 6v8c0 1.5.8 2.7 2 3.4v1L4 22h2.6l2.6-3H15l2.6 3H20l-3-3.6zM16 15c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1zM10.5 3h3c.3 0 .5.2.5.5s-.2.5-.5.5h-3c-.3 0-.5-.2-.5-.5s.2-.5.5-.5zM7 7c0-.6.4-1 1-1h8c.5 0 1 .4 1 1v3c0 .6-.5 1-1 1H8c-.6 0-1-.4-1-1V7zm1 6c.6 0 1 .4 1 1s-.4 1-1 1-1-.4-1-1 .4-1 1-1z" /></svg>;
});