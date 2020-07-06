import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" style={{
  width: "1.125rem",
  height: "1.125rem"
}} {...props}><path d="M9 6a3 3 0 1 1 6 0v1.5A1.5 1.5 0 0 1 13.5 9h-6A1.5 1.5 0 0 0 6 10.5v12A1.5 1.5 0 0 0 7.5 24h9a1.5 1.5 0 0 0 1.5-1.5V6A6 6 0 0 0 6 6a1.5 1.5 0 1 0 3 0z" /></svg>);