import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style={{
  width: "1.5rem",
  height: "1.5rem"
}} {...props}><path d="M13.5 12H10V9h3.5a1.5 1.5 0 0 1 0 3z" /><path fillRule="evenodd" d="M2 12C2 6.5 6.5 2 12 2s10 4.5 10 10-4.5 10-10 10S2 17.5 2 12zm6-5h5.5a3.5 3.5 0 1 1 0 7H10v2a1 1 0 1 1-2 0V7z" clipRule="evenodd" /></svg>);