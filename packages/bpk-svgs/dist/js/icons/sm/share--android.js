import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" style={{
  width: "1.125rem",
  height: "1.125rem"
}} {...props}><path d="M17.95 14.95a3.23 3.23 0 00-2.1.8l-7-3.5v-.8l7-3.5a2.64 2.64 0 002.1 1 3 3 0 003-3 3 3 0 10-6 0v.4l-7 3.5a2.52 2.52 0 00-2-.9 3 3 0 000 6 3.23 3.23 0 002.1-.8l7 3.5v.4a3 3 0 006 0 3.12 3.12 0 00-3.1-3.1z" /></svg>);