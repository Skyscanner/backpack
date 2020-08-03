import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style={{
  width: "1.5rem",
  height: "1.5rem"
}} {...props}><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zM5.68 16.914a8 8 0 0 1 0-9.82L16.905 18.32h.001A8 8 0 0 1 5.68 16.914zm12.64-.01v.002L7.094 5.68A8 8 0 0 1 18.32 16.905z" /></svg>);