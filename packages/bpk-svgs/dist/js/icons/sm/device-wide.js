import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" style={{
  width: "1.125rem",
  height: "1.125rem"
}} {...props}><path d="M4.5 3a3 3 0 0 0-3 3v9a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3h-15zm-3 16.5a1.5 1.5 0 0 0 0 3h21a1.5 1.5 0 0 0 0-3h-21z" /></svg>);