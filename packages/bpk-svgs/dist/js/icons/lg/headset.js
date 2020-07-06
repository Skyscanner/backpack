import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style={{
  width: "1.5rem",
  height: "1.5rem"
}} {...props}><path d="M12 1a9 9 0 0 0-9 9v5a3 3 0 0 0 3 3h2a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1H5v-2a7 7 0 0 1 14 0v2h-3a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h3a3 3 0 0 1-3 3h-3a1 1 0 1 0 0 2h3a5 5 0 0 0 5-5v-8a9 9 0 0 0-9-9z" /></svg>);