import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" style={{
  width: "1.125rem",
  height: "1.125rem"
}} {...props}><path d="M21 4H3a1 1 0 0 0-1 1v13h6v2h8v-2h6V5a1 1 0 0 0-1-1zm-1 12H4V6h16zm-5-5l-5 3V8z" /></svg>);