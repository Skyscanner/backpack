import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" style={{
  width: "1.125rem",
  height: "1.125rem"
}} {...props}><path d="M10 10V5a2 2 0 114 0v5h5a2 2 0 110 4h-5v5a2 2 0 11-4 0v-5H5a2 2 0 110-4h5z" /></svg>);