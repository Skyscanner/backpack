import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style={{
  width: "1.5rem",
  height: "1.5rem"
}} {...props}><path d="M5 5c0 .637.298 1.204.762 1.57.14.111.238.272.238.45V10a2 2 0 1 0 0 4h2a2 2 0 1 0 0-4V7.02c0-.178.098-.339.238-.45A2 2 0 1 0 5 5zm14 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm-2 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM6 16a1 1 0 1 1 2 0v.98c0 .178.098.339.238.45a2 2 0 1 1-2.477 0A.585.585 0 0 0 6 16.98V16z" /></svg>);