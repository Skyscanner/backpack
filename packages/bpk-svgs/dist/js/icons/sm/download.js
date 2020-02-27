import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="null" height="null" style={{
  width: "3.5rem/3",
  height: "3.5rem/3"
}} {...props}><path d="M3 17h2v2h14v-2h2v4H3v-4zm10-4V3h-2v10l-2.5-2.5L7 12l5 5 5-5-1.5-1.5L13 13z" /></svg>);