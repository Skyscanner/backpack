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
  }} {...props}><path d="M9.72 11.346l2.744-1.363c.466.045.794.262.984.65.182.42.151.8-.094 1.142L10.7 13.093l1.273 4.565 6.062-10.012-11.702.243 3.388 3.457zm-1.1 1.735L3.287 7.637c-.614-.626-.183-1.681.693-1.7l15.832-.328a1 1 0 0 1 .876 1.517l-8.2 13.546c-.454.75-1.584.595-1.82-.249l-2.046-7.342z" /></svg>;
});