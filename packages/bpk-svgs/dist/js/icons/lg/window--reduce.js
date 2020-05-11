import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style={{
  width: "1.5rem",
  height: "1.5rem"
}} {...props}><path d="M16.48 7.71a1 1 0 00-1.41 0L10 12.77V10a1 1 0 10-2 0v5a1 1 0 001 1h5a1 1 0 100-2h-2.4l4.88-4.88a1 1 0 000-1.41zM21 19a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h7v2H5v14h14v-7h2" /></svg>);