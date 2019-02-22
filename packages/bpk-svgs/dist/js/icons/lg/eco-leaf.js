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
  }} {...props}><path d="M3 18.406l.129 1.233a13.265 13.265 0 0 0 5.349-2.259 6.436 6.436 0 0 0 8.463 1.773l.022-.007C20.91 17.365 21 10.409 21 10.409V4.561a.529.529 0 0 0-.837-.428 10.557 10.557 0 0 1-4.271 1.151h-4.223a6.4 6.4 0 0 0-6.426 6.373A6.3 6.3 0 0 0 6.632 15.6 52.793 52.793 0 0 0 15.5 8.184l.908.852a56.776 56.776 0 0 1-8.892 7.477A13.36 13.36 0 0 1 3 18.406z" /></svg>;
