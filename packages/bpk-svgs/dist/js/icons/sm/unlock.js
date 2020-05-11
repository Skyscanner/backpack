import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" style={{
  width: "1.125rem",
  height: "1.125rem"
}} {...props}><path d="M17 10.027V5.982a4 4 0 00-4-4h-2a4 4 0 00-4 4v1.036h2V5.982a2 2 0 012-2h2a2 2 0 012 2v4.036H6.95a2.165 2.165 0 00-2 2.1v7.7a2.22 2.22 0 002.2 2.2h9.7a2.22 2.22 0 002.2-2.2v-7.7A2.342 2.342 0 0017 10.027z" /></svg>);