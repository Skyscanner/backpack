import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="null" height="null" style={{
  width: "3.5rem/3",
  height: "3.5rem/3"
}} {...props}><path d="M13.238 12l4.506 4.506a.875.875 0 1 1-1.238 1.238L12 13.238l-4.506 4.506a.875.875 0 0 1-1.238-1.238L10.763 12 6.256 7.494a.875.875 0 1 1 1.238-1.238L12 10.763l4.506-4.505a.875.875 0 0 1 1.238 1.237L13.238 12z" /></svg>);