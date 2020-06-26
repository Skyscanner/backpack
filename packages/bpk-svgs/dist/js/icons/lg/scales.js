import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style={{
  width: "1.5rem",
  height: "1.5rem"
}} {...props}><path d="M13.855 11.615l-1.582-3.441a.302.302 0 0 0-.546 0l-1.582 3.441C9.62 12.758 10.586 14 12 14s2.38-1.242 1.855-2.385z" /><path fillRule="evenodd" d="M3 6.097c0-.225.073-.445.228-.608C4.477 4.183 7.016 3 12 3c4.955 0 7.27 1.158 8.705 2.467.194.177.295.43.295.694V18a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6.097zM18 12a6 6 0 1 1-12 0 6 6 0 0 1 12 0z" clipRule="evenodd" /></svg>);