import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" style={{
  width: "1.125rem",
  height: "1.125rem"
}} {...props}><path d="M12 6a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 9a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm-3 6a3 3 0 1 0 6 0 3 3 0 0 0-6 0z" /></svg>);