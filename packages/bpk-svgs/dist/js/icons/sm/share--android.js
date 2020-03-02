import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" style={{
  width: "1rem",
  height: "1rem"
}} {...props}><path d="M17.95 14.95a3.23 3.23 0 0 0-2.1.8l-7-3.5v-.8l7-3.5a2.64 2.64 0 0 0 2.1 1 3 3 0 0 0 3-3 3 3 0 1 0-6 0v.4l-7 3.5a2.52 2.52 0 0 0-2-.9 3 3 0 0 0 0 6 3.23 3.23 0 0 0 2.1-.8l7 3.5v.4a3 3 0 0 0 6 0 3.12 3.12 0 0 0-3.1-3.1z" /></svg>);