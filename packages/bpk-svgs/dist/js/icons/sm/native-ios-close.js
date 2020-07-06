import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" style={{
  width: "1.125rem",
  height: "1.125rem"
}} {...props}><path d="M5.56 3.44a1.5 1.5 0 1 0-2.12 2.12L9.878 12l-6.44 6.44a1.5 1.5 0 0 0 2.122 2.12L12 14.122l6.44 6.44a1.5 1.5 0 0 0 2.12-2.122L14.122 12l6.44-6.44a1.5 1.5 0 0 0-2.122-2.12L12 9.878l-6.44-6.44z" /></svg>);