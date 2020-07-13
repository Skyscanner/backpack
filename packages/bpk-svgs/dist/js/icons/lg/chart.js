import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style={{
  width: "1.5rem",
  height: "1.5rem"
}} {...props}><path d="M19 2a2 2 0 0 0-2 2v16a2 2 0 0 0 4 0V4a2 2 0 0 0-2-2zm-9 9a2 2 0 0 1 4 0v9a2 2 0 0 1-4 0zm-7 5a2 2 0 0 1 4 0v4a2 2 0 0 1-4 0z" /></svg>);