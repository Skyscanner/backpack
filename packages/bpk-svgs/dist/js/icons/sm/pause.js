import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" style={{
  width: "1.125rem",
  height: "1.125rem"
}} {...props}><path d="M6 1.5A1.5 1.5 0 0 0 4.5 3v18A1.5 1.5 0 0 0 6 22.5h3a1.5 1.5 0 0 0 1.5-1.5V3A1.5 1.5 0 0 0 9 1.5H6zm9 0A1.5 1.5 0 0 0 13.5 3v18a1.5 1.5 0 0 0 1.5 1.5h3a1.5 1.5 0 0 0 1.5-1.5V3A1.5 1.5 0 0 0 18 1.5h-3z" /></svg>);