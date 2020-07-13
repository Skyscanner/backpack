import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style={{
  width: "1.5rem",
  height: "1.5rem"
}} {...props}><path d="M15.75 2h-7.5A2.25 2.25 0 0 0 6 4.25v15.5A2.25 2.25 0 0 0 8.25 22h7.5A2.25 2.25 0 0 0 18 19.75V4.25A2.25 2.25 0 0 0 15.75 2zm-2.5 17.5h-2.5a.75.75 0 0 1 0-1.5h2.5a.75.75 0 0 1 0 1.5z" /></svg>);