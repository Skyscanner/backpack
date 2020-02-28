import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" style={{
  width: "1rem",
  height: "1rem"
}} {...props}><path d="M4.3 15.7L12 8.6l7.7 7.1c.6.6.2 1.7-.7 1.7H5c-.9 0-1.3-1-.7-1.7z" /></svg>);