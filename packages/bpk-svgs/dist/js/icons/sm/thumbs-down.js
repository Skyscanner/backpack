import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" style={{
  width: "1rem",
  height: "1rem"
}} {...props}><path d="M3.05 14.71l2.53-7.28A2 2 0 0 1 7.5 6H14a1 1 0 0 1 1 1v7l-2.48 5.79A2 2 0 0 1 10.69 21h-.46a1 1 0 0 1-1-1.2L10 16H4a1 1 0 0 1-.95-1.29zM16 14h3V6h-3z" /></svg>);