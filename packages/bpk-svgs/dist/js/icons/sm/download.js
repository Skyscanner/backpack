import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" style={{
  width: "1rem",
  height: "1rem"
}} {...props}><path d="M3 17h2v2h14v-2h2v4H3v-4zm10-4V3h-2v10l-2.5-2.5L7 12l5 5 5-5-1.5-1.5L13 13z" /></svg>);