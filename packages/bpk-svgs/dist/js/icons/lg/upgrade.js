import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style={{
  width: "1.5rem",
  height: "1.5rem"
}} {...props}><path fillRule="evenodd" d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10zm-6.293.121a1 1 0 0 0 0-1.414L12 7l-3.707 3.707a1 1 0 1 0 1.414 1.414L11 10.828V13a1 1 0 1 0 2 0v-2.172l1.293 1.293a1 1 0 0 0 1.414 0zM12 15a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" clipRule="evenodd" /></svg>);