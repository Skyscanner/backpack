import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" style={{
  width: "1rem",
  height: "1rem"
}} {...props}><path d="M22 12a1.504 1.504 0 0 1-1.5 1.5h-4.596L11 22H9l2-6v-2.5H5.667L4 16H2l1-4-1-4h2l1.667 2.5H11V8L9 2h2l4.904 8.5H20.5A1.504 1.504 0 0 1 22 12z" /></svg>);