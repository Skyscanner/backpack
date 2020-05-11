import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style={{
  width: "1.5rem",
  height: "1.5rem"
}} {...props}><path d="M21 5.4a10.187 10.187 0 00-.295-2.4H3.295A10.187 10.187 0 003 5.4a9.396 9.396 0 008 9.537V20H7v1h10v-1h-4v-5.063A9.396 9.396 0 0021 5.4zM18.989 4c.007.134.01 1.268.01 1.4 0 .202-.013.401-.027.6H8a21.765 21.765 0 001.01 6.262A7.671 7.671 0 015 5.4c0-.132.003-1.266.01-1.4z" /></svg>);