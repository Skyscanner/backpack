import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style={{
  width: "1.5rem",
  height: "1.5rem"
}} {...props}><path d="M16.5 15a1.5 1.5 0 10-1.5-1.5 1.5 1.5 0 001.5 1.5zm-.5-4h4a2 2 0 012 2v1a2 2 0 01-2 2h-4a2 2 0 01-2-2v-1a2 2 0 012-2zm4 6v1a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2h14a1 1 0 010 2H4v1h14a2 2 0 012 2v1h-5a2 2 0 00-2 2v3a2 2 0 002 2z" /></svg>);