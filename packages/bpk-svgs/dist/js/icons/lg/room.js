import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style={{
  width: "1.5rem",
  height: "1.5rem"
}} {...props}><path d="M12.004 1C9.002 1 7 3 7 6c0 .5.468 1 1 1s1.001-.5 1.002-1c.005-2 1.001-3 3.002-3s3.002 1 3.002 3S14 9 12.998 9c.133 0-.17 0 0 0H9c-.999 0-2 1-2 2l.03 9c0 1.5 1.47 2.984 2.972 2.984l4.003.016C15.506 23 17 21.5 17 20V6c0-3-1.994-5-4.996-5z" /></svg>);