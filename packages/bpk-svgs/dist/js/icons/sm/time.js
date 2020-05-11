import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" style={{
  width: "1.125rem",
  height: "1.125rem"
}} {...props}><path d="M12 4a8 8 0 11-8 8 8 8 0 018-8m0-2a10 10 0 1010 10A10 10 0 0012 2zm-1 10.41l3.89 3.89a1 1 0 001.41 0 1 1 0 000-1.41l-3.3-3.3V8a1 1 0 00-1-1 1 1 0 00-1 1z" /></svg>);