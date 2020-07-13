import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" style={{
  width: "1.125rem",
  height: "1.125rem"
}} {...props}><path fillRule="evenodd" d="M21.31 12a1.5 1.5 0 0 1-1.5 1.5H8.431l4.94 4.94a1.5 1.5 0 0 1-2.122 2.12L2.69 12l8.56-8.56a1.5 1.5 0 0 1 2.122 2.12L8.43 10.5h11.38a1.5 1.5 0 0 1 1.5 1.5z" /></svg>);