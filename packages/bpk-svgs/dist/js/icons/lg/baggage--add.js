import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style={{
  width: "1.5rem",
  height: "1.5rem"
}} {...props}><path d="M13 16.5a5.51 5.51 0 014-5.29V7h-1a4 4 0 10-8 0H7v12h6.61a5.46 5.46 0 01-.61-2.5zM12 5a2 2 0 012 2h-4a2 2 0 012-2zm7 6V7h1a2 2 0 012 2v3.26A5.47 5.47 0 0019 11zM4 7h1v12H4a2 2 0 01-2-2V9a2 2 0 012-2zm14.5 6a3.5 3.5 0 103.5 3.5 3.5 3.5 0 00-3.5-3.5zm.5 4v2h-1v-2h-2v-1h2v-2h1v2h2v1z" /></svg>);