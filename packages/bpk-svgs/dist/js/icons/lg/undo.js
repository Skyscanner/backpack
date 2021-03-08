import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style={{
  width: "1.5rem",
  height: "1.5rem"
}} {...props}><path d="M8.707 3.293a1 1 0 0 1 0 1.414L5.414 8H15.5a6.5 6.5 0 1 1 0 13H12a1 1 0 1 1 0-2h3.5a4.5 4.5 0 1 0 0-9H5.414l3.293 3.293a1 1 0 1 1-1.414 1.414l-5-5a1 1 0 0 1 0-1.414l5-5a1 1 0 0 1 1.414 0z" /></svg>);