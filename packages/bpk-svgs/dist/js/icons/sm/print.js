import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" style={{
  width: "1rem",
  height: "1rem"
}} {...props}><path d="M19 6H5a2 2 0 0 0-2 2v10h4v-6h10v6h4V8a2 2 0 0 0-2-2zM6 10a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm11-5H7V3h10v2zm-9 8h8v8H8v-8z" /></svg>);