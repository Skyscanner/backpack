import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" style={{
  width: "1.125rem",
  height: "1.125rem"
}} {...props}><path d="M12 4.5A7.5 7.5 0 0 0 4.5 12v1.5h3A1.5 1.5 0 0 1 9 15v6a1.5 1.5 0 0 1-1.5 1.5h-3a3 3 0 0 1-3-3V12C1.5 6.201 6.201 1.5 12 1.5S22.5 6.201 22.5 12v7.5a3 3 0 0 1-3 3h-3A1.5 1.5 0 0 1 15 21v-6a1.5 1.5 0 0 1 1.5-1.5h3V12A7.5 7.5 0 0 0 12 4.5z" /></svg>);