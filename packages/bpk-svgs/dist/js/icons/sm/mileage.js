import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" style={{
  width: "1.125rem",
  height: "1.125rem"
}} {...props}><path fillRule="evenodd" d="M10.5 3A1.5 1.5 0 0 1 12 1.5c5.799 0 10.5 4.701 10.5 10.5S17.799 22.5 12 22.5 1.5 17.799 1.5 12c0-1.559.34-3.042.953-4.376a1.5 1.5 0 1 1 2.726 1.252A7.5 7.5 0 1 0 12 4.5 1.5 1.5 0 0 1 10.501 3z" clipRule="evenodd" /><path fillRule="evenodd" d="M6.728 3.214a1.5 1.5 0 0 1 2.058.514l4.5 7.5a1.5 1.5 0 1 1-2.572 1.544l-4.5-7.5a1.5 1.5 0 0 1 .514-2.058z" clipRule="evenodd" /></svg>);