import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style={{
  width: "1.5rem",
  height: "1.5rem"
}} {...props}><path fillRule="evenodd" d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zM9 8a1 1 0 0 1 2 0v4h1a1 1 0 1 1 0 2H8a1 1 0 1 1 0-2h1V8zm1 7a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm7-7a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-1 5a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm1 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" clipRule="evenodd" /></svg>);