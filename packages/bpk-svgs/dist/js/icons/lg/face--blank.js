import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style={{
  width: "1.5rem",
  height: "1.5rem"
}} {...props}><path d="M12 4a8 8 0 11-8 8 8.009 8.009 0 018-8m0-2a10 10 0 1010 10A10 10 0 0012 2zM8.5 9a1.5 1.5 0 101.5 1.5A1.5 1.5 0 008.5 9zm7 0a1.5 1.5 0 101.5 1.5A1.5 1.5 0 0015.5 9zm.5 7a1 1 0 00-1-1H9a1 1 0 00-1 1 1 1 0 001 1h6a1 1 0 001-1z" /></svg>);