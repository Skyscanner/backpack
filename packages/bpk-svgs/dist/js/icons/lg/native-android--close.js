import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style={{
  width: "1.5rem",
  height: "1.5rem"
}} {...props}><path fillRule="evenodd" d="M5.287 5.305a1 1 0 0 1 1.414 0l5.293 5.293 5.293-5.293a1 1 0 0 1 1.438 1.39l-.024.024-5.293 5.293 5.293 5.293a1 1 0 0 1-1.414 1.414l-5.293-5.293L6.7 18.72a1 1 0 0 1-1.414-1.414l5.293-5.293L5.287 6.72a1 1 0 0 1 0-1.414z" /></svg>);