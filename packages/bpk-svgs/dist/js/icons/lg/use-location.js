import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style={{
  width: "1.5rem",
  height: "1.5rem"
}} {...props}><path d="M3.459 9.148l16.007-6.072c.911-.346 1.803.547 1.458 1.458L14.852 20.54c-.698 1.842-3.255 1.971-4.135.21l-1.923-3.846a3.8 3.8 0 0 0-1.7-1.7l-3.844-1.92c-1.762-.88-1.633-3.437.209-4.135z" /></svg>);