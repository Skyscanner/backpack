import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" style={{
  width: "1.125rem",
  height: "1.125rem"
}} {...props}><path fillRule="evenodd" d="M3 4.5a3 3 0 0 1 3-3h9a3 3 0 0 1 3 3V6a4.5 4.5 0 1 1 0 9v1.5a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3v-12zm16.5 6A1.5 1.5 0 0 1 18 12V9a1.5 1.5 0 0 1 1.5 1.5z" clipRule="evenodd" /><path d="M3 21a1.5 1.5 0 0 0 0 3h15a1.5 1.5 0 0 0 0-3H3z" /></svg>);