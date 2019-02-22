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
  }} {...props}><path d="M14.981 12.166s.622.042.738.374c.116.332.553 2.054.553 2.054.238.403.644.677 1.107.747a31.7 31.7 0 0 0 3.308.659c.848 0 .961-.111 1.136-.892.123-.885.182-1.777.177-2.67 0 0-.12-.629-1.158-1.277C19.804 10.513 17.375 9 12 9s-7.8 1.513-8.842 2.161C2.116 11.809 2 12.438 2 12.438c-.005.893.054 1.785.177 2.67.175.781.29.892 1.136.892a31.7 31.7 0 0 0 3.308-.659c.463-.07.87-.344 1.107-.747 0 0 .437-1.723.553-2.054.116-.331.738-.374.738-.374h5.962z" /></svg>;
