import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style={{
  width: "1.5rem",
  height: "1.5rem"
}} {...props}><path fillRule="evenodd" d="M5 2a3 3 0 0 0-3 3v3.7a2 2 0 0 0 1.188 1.828l6.657 2.959a5 5 0 1 0 4.31 0l6.657-2.96A2 2 0 0 0 22 8.7V5a3 3 0 0 0-3-3H5zm7 19a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM10 4a1 1 0 0 0-1 1v4.382a1 1 0 0 0 .553.894l2 1a1 1 0 0 0 .894 0l2-1A1 1 0 0 0 15 9.382V5a1 1 0 0 0-1-1h-4z" clipRule="evenodd" /></svg>);