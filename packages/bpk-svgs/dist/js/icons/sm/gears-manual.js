import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" style={{
  width: "1.125rem",
  height: "1.125rem"
}} {...props}><path d="M20 6.758v6.278h-7v4.277a2 2 0 11-2 0v-4.277H6v4.277a2 2 0 11-2 0V6.758a2 2 0 112 0v4.028h5V6.758a2 2 0 112 0v4.028h5V6.758a2 2 0 112 0z" /></svg>);