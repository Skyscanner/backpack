import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style={{
  width: "1.5rem",
  height: "1.5rem"
}} {...props}><path d="M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10z" /><path fillRule="evenodd" d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zM4 12c0-4.395 3.605-8 8-8s8 3.605 8 8-3.605 8-8 8-8-3.605-8-8z" clipRule="evenodd" /></svg>);