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
  }} {...props}><path d="M20 8h-4c0-2.2-1.8-4-4-4S8 5.8 8 8H4c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-8c0-1.1-.9-2-2-2zm-8-2c1.1 0 2 .9 2 2h-4c0-1.1.9-2 2-2zm3.9 5.9l-4.4 5.2c-.3.4-.9.4-1.2.1l-2.1-1.8c-.2-.2-.2-.5 0-.7l.5-.7c.2-.2.4-.2.6-.1l1.2 1.1c.1.1.2.1.3 0l3.7-4.4c.2-.2.5-.2.6 0l.7.6c.2.2.3.5.1.7z" /></svg>;
});