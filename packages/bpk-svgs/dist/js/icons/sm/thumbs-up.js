import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" style={{
  width: "1rem",
  height: "1rem"
}} {...props}><path d="M19 9h-6l.76-3.8a1 1 0 0 0-1-1.2h-.46a2 2 0 0 0-1.84 1.21L8 11v7a1 1 0 0 0 1 1h6.51a2 2 0 0 0 1.92-1.43L20 10.29A1 1 0 0 0 19 9zM4 11h3v8H4z" /></svg>);