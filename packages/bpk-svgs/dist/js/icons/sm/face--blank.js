import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" style={{
  width: "1rem",
  height: "1rem"
}} {...props}><path d="M12 4a8 8 0 1 1-8 8 8.009 8.009 0 0 1 8-8m0-2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zM8.5 9a1.5 1.5 0 1 0 1.5 1.5A1.5 1.5 0 0 0 8.5 9zm7 0a1.5 1.5 0 1 0 1.5 1.5A1.5 1.5 0 0 0 15.5 9zm.5 7a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1 1 1 0 0 0 1 1h6a1 1 0 0 0 1-1z" /></svg>);