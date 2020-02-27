import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" style={{
  width: "1rem",
  height: "1rem"
}} {...props}><path d="M4 13h12.2l-5.6 5.6L12 20l8-8-8-8-1.4 1.4 5.6 5.6H4v2z" /></svg>);