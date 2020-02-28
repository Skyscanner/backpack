import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" style={{
  width: "1rem",
  height: "1rem"
}} {...props}><path d="M8 5.036a2 2 0 1 1-2-2 2 2 0 0 1 2 2zm10-2a2 2 0 1 0 2 2 2 2 0 0 0-2-2zM3 11v11h2v-6.876h2V22h2V9H5a2 2 0 0 0-2 2zm12-2v13h2v-6.876h2V22h2V11a2 2 0 0 0-2-2zm-1.036 3A1.964 1.964 0 1 0 12 13.964 1.964 1.964 0 0 0 13.964 12zm0 3.036H10V22h3.964z" /></svg>);