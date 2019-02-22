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
  }} {...props}><path d="M13.815 20c-.245 0-.49-.123-.736-.368l-2.086-4.54a.782.782 0 0 1 0-.736l3.68-4.907-4.907 3.68c-.245 0-.613 0-.859-.122l-4.539-2.208C4.123 10.676 4 10.43 4 10.062c0-.245.245-.613.49-.613l14.478-5.398c.245-.123.613 0 .858.123.123.368.123.613.123.858L14.551 19.51c-.123.246-.368.491-.736.491.123 0 .123 0 0 0z" /></svg>;
