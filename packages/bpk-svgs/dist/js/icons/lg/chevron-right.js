import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style={{
  width: "1.5rem",
  height: "1.5rem"
}} {...props}><path d="M7.8 4.287a1 1 0 0 0 0 1.414l6.292 6.293L7.8 18.287a1 1 0 0 0 1.39 1.438l.024-.024 7-7a1 1 0 0 0 0-1.414l-7-7a1 1 0 0 0-1.414 0z" /></svg>);