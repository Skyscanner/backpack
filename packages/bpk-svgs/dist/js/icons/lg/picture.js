import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style={{
  width: "1.5rem",
  height: "1.5rem"
}} {...props}><path d="M8.5 10.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" /><path fillRule="evenodd" d="M6 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3H6zm0 2h12a1 1 0 0 1 1 1v9l-5.72-2.697a3 3 0 0 0-2.56 0L5 15V6a1 1 0 0 1 1-1z" clipRule="evenodd" /></svg>);