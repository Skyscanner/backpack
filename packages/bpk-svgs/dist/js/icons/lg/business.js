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
  }} {...props}><path d="M12.4 9.3l-.7 5.2c0 .3-.2.5-.5.5h-.5l-1 7h-2l-1-7h-.5c-.3 0-.5-.2-.5-.5L5 9.3C4.9 8.1 5.8 7 7 7h.7l.8 3.8c0 .2.4.2.5 0L9.7 7h.7c1.2 0 2.2 1.1 2 2.3zM8.7 6c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM18 16.1v4.8c0 .6-.5 1.1-1.1 1.1h-2.8c-.6 0-1.1-.5-1.1-1.1v-4.8c0-.6.4-1 1-1.1v-.7c0-.8.6-1.4 1.4-1.4h.3c.8 0 1.4.6 1.4 1.4v.7c.5.1.9.5.9 1.1zm-3-1.7v.6h1v-.6c0-.2-.2-.3-.3-.3h-.3c-.2-.1-.4.1-.4.3z" /></svg>;
});