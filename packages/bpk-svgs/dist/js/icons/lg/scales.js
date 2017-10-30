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
  }} {...props}><path d="M20.7 11.5l-2.5-5.8c.5-.2.8-.7.6-1.2-.1-.5-.6-.9-1.2-.8l-4.7 1V4c0-.5-.4-1-1-1-.5 0-1 .4-1 1v1.2l-5 1.1c-.5.1-.9.6-.7 1.2 0 .2.2.5.5.6l-2.4 5.5c-.2.4-.3.8-.3 1.2 0 .6.2 1.2.5 1.6.7 1 1.8 1.6 3 1.6s2.4-.6 3-1.6c.3-.4.5-1 .5-1.6 0-.4-.1-.8-.3-1.2L7.3 8l3.2-.7v2.1c0 .3.2.5.5.5v9H6.4c-.9 0-1.7.5-2.1 1.3l-.2.4c-.1.1 0 .2.1.3h15.4c.1 0 .2-.1.2-.2v-.1l-.2-.4c-.4-.8-1.2-1.3-2.1-1.3H13v-9c.3 0 .5-.3.5-.5V7.6c0-.3-.2-.6-.5-.6v-.2l3.6-.8-2.4 5.4c-.2.4-.3.8-.3 1.2 0 .6.2 1.2.5 1.6.7 1 1.8 1.6 3 1.6s2.4-.6 3-1.6c.3-.5.5-1.1.5-1.6.1-.3 0-.7-.2-1.1zM4.5 13.4l1.8-4.1c.1-.1.2-.2.4-.1.1 0 .1.1.1.1l1.8 4.1H4.5zm11-2.1l1.8-4.1c.1-.1.2-.2.4-.1.1 0 .1.1.1.1l1.8 4.1h-4.1z" /></svg>;
});