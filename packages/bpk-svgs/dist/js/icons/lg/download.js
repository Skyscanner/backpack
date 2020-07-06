import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style={{
  width: "1.5rem",
  height: "1.5rem"
}} {...props}><path d="M6.293 8.296a1 1 0 0 0 0 1.414l5 5a1 1 0 0 0 1.414 0l5-5a1 1 0 0 0-1.414-1.414L13 11.589V3a1 1 0 1 0-2 0v8.589L7.707 8.296a1 1 0 0 0-1.414 0z" /><path d="M5 15a1 1 0 1 0-2 0v3a4 4 0 0 0 4 4h10a4 4 0 0 0 4-4v-3a1 1 0 1 0-2 0v3a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-3z" /></svg>);