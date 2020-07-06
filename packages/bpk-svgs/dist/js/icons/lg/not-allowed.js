import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style={{
  width: "1.5rem",
  height: "1.5rem"
}} {...props}><path fillRule="evenodd" d="M16.906 18.32A8 8 0 0 1 5.68 7.094L16.905 18.32zm1.414-1.414L7.094 5.68A8 8 0 0 1 18.32 16.905zM22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10z" clipRule="evenodd" /></svg>);