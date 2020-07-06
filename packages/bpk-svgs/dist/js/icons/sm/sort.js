import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" style={{
  width: "1.125rem",
  height: "1.125rem"
}} {...props}><path fillRule="evenodd" d="M6 21a1.5 1.5 0 0 0 1.5-1.5V7.243l1.94 1.939a1.5 1.5 0 0 0 2.12-2.121L6 1.5.44 7.06a1.5 1.5 0 1 0 2.12 2.122l1.94-1.94V19.5A1.5 1.5 0 0 0 6 21zM18 3a1.5 1.5 0 0 0-1.5 1.5v12.257l-1.94-1.939a1.5 1.5 0 0 0-2.12 2.121L18 22.5l5.56-5.56a1.5 1.5 0 0 0-2.12-2.122l-1.94 1.94V4.5A1.5 1.5 0 0 0 18 3z" clipRule="evenodd" /></svg>);