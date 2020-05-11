import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" style={{
  width: "1.125rem",
  height: "1.125rem"
}} {...props}><path d="M13.238 12l4.506 4.506a.875.875 0 11-1.238 1.238L12 13.238l-4.506 4.506a.875.875 0 01-1.238-1.238L10.763 12 6.256 7.494a.875.875 0 111.238-1.238L12 10.763l4.506-4.505a.875.875 0 011.238 1.237L13.238 12z" /></svg>);