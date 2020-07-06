import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style={{
  width: "1.5rem",
  height: "1.5rem"
}} {...props}><path d="M20 12A8 8 0 0 0 8.89 4.627a1 1 0 0 1-.78-1.842A9.972 9.972 0 0 1 12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12c0-1.167.2-2.29.57-3.333a1 1 0 1 1 1.885.666A8 8 0 1 0 20 12z" /><path d="M4.293 6.207a1 1 0 0 1 1.414-1.414l7 7a1 1 0 0 1-1.414 1.414l-7-7z" /></svg>);