import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" style={{
  width: "1.125rem",
  height: "1.125rem"
}} {...props}><path fillRule="evenodd" d="M4.5 1.5a3 3 0 0 0-3 3v15a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3v-15a3 3 0 0 0-3-3h-15zm13.094 6.48a1.536 1.536 0 0 1-.068 2.15l-6.624 6.37-4.523-4.948a1.535 1.535 0 0 1 .124-2.147 1.486 1.486 0 0 1 2.118.126l2.477 2.614 4.376-4.234a1.486 1.486 0 0 1 2.12.07z" clipRule="evenodd" /></svg>);