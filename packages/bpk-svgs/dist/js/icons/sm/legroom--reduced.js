import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" style={{
  width: "1rem",
  height: "1rem"
}} {...props}><path d="M20.97 19.2A1.507 1.507 0 0 1 19.5 21H15v-3l1-4h-6a3.009 3.009 0 0 1-3-3V3h6v6h5a2.006 2.006 0 0 1 2 2l-2 7h1.44a1.539 1.539 0 0 1 1.53 1.2zM6 12V3H4v9a5 5 0 0 0 5 5h4v-2H9a3 3 0 0 1-3-3z" /></svg>);