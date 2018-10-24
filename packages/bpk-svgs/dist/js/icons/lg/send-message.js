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
  }} {...props}><path d="M20.708 12.788a1.023 1.023 0 0 0 .159-.2l.009-.02a1.1 1.1 0 0 0-.471-1.522L4.5 3.108A1.011 1.011 0 0 0 4.045 3a1.084 1.084 0 0 0-1.017 1.334l1.54 5.986 2.37 1.185-1.459-5.671L17.843 12H5l-1.974 7.666a1.169 1.169 0 0 0-.022.3c0 .031.008.059.012.089a1.074 1.074 0 0 0 .039.189c.01.031.021.061.034.091a1.081 1.081 0 0 0 .084.162.835.835 0 0 0 .047.074 1.131 1.131 0 0 0 .148.161c.011.01.019.022.031.031a1.026 1.026 0 0 0 .219.139c.021.01.044.016.066.025a1.03 1.03 0 0 0 .182.054c.03.005.06.008.09.01a.827.827 0 0 0 .087.009.836.836 0 0 0 .1-.012.725.725 0 0 0 .08-.009 1.031 1.031 0 0 0 .268-.086L20.4 13.021a1.106 1.106 0 0 0 .272-.189.225.225 0 0 0 .036-.044z" /></svg>;
});