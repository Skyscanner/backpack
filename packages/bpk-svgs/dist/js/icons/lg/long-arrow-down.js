import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style={{
  width: "1.5rem",
  height: "1.5rem"
}} {...props}><path fillRule="evenodd" d="M19.707 11.293a1 1 0 0 1 0 1.414l-7 7a1 1 0 0 1-1.414 0l-7-7a1 1 0 1 1 1.414-1.414L11 16.586V5a1 1 0 1 1 2 0v11.586l5.293-5.293a1 1 0 0 1 1.414 0z" clipRule="evenodd" /></svg>);