import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style={{
  width: "1.5rem",
  height: "1.5rem"
}} {...props}><path d="M19.749 4a2.25 2.25 0 0 1 2.25 2.25v11.502a2.25 2.25 0 0 1-2.25 2.25H4.25A2.25 2.25 0 0 1 2 17.752V6.25A2.25 2.25 0 0 1 4.25 4h15.499zM13.75 15.5h-3.5a.75.75 0 0 0 0 1.5h3.5a.75.75 0 1 0 0-1.5z" /></svg>);