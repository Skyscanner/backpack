import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style={{
  width: "1.5rem",
  height: "1.5rem"
}} {...props}><path fillRule="evenodd" d="M3 19a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V7.243a3 3 0 0 0-.879-2.122l-1.535-1.535A2 2 0 0 0 17.172 3H6.828a2 2 0 0 0-1.414.586L3.88 5.12A3 3 0 0 0 3 7.243V19zM6.707 5.293A1 1 0 0 1 7.414 5h9.172a1 1 0 0 1 .707.293l.853.853a.5.5 0 0 1-.353.854H6.207a.5.5 0 0 1-.353-.854l.853-.853zM9 11a1 1 0 1 0-2 0 5 5 0 0 0 10 0 1 1 0 1 0-2 0 3 3 0 1 1-6 0z" clipRule="evenodd" /></svg>);