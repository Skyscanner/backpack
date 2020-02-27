import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" style={{
  width: "1rem",
  height: "1rem"
}} {...props}><path d="M3 21v-3.1c0-2.8 2.2-5 5-5h8c2.8 0 5 2.2 5 5V21H3zM16 7c0-2.2-1.8-4-4-4S8 4.8 8 7s1.8 4 4 4 4-1.8 4-4z" /></svg>);