import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style={{
  width: "1.5rem",
  height: "1.5rem"
}} {...props}><path d="M4 13h12.2l-5.6 5.6L12 20l8-8-8-8-1.4 1.4 5.6 5.6H4v2z" /></svg>);