import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style={{
  width: "1.5rem",
  height: "1.5rem"
}} {...props}><path d="M11 1a1 1 0 1 0 0 2h5a3 3 0 0 1 3 3v12a1 1 0 1 0 2 0V6a5 5 0 0 0-5-5h-5z" /><path d="M6 4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H6z" /></svg>);