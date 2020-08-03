import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" style={{
  width: "1.125rem",
  height: "1.125rem"
}} {...props}><path d="M1.5 12A1.5 1.5 0 0 1 3 10.5h18a1.5 1.5 0 0 1 0 3H3A1.5 1.5 0 0 1 1.5 12z" /></svg>);