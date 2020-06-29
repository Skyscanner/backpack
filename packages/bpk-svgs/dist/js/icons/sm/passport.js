import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" style={{
  width: "1.125rem",
  height: "1.125rem"
}} {...props}><path fillRule="evenodd" d="M17.7 1.5H4.031C3.461 1.5 3 1.97 3 2.55v18.9c0 .58.462 1.05 1.031 1.05H17.7c1.822 0 3.3-1.568 3.3-3.5V5c0-1.932-1.478-3.5-3.3-3.5zM15 9a3 3 0 1 1-6 0 3 3 0 0 1 6 0zm-6 6a1.5 1.5 0 0 0 0 3h6a1.5 1.5 0 0 0 0-3H9z" clipRule="evenodd" /></svg>);