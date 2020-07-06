import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" style={{
  width: "1.125rem",
  height: "1.125rem"
}} {...props}><path d="M10.5 3a1.5 1.5 0 1 0-3 0v11.25a2.25 2.25 0 0 0 2.25 2.25h5.469a3 3 0 0 1 2.683 1.658l1.756 3.513a1.5 1.5 0 1 0 2.684-1.342l-1.757-3.512A6 6 0 0 0 15.22 13.5H10.5V3z" /><path d="M6 6a1.5 1.5 0 1 0-3 0v9a6 6 0 0 0 6 6h6a1.5 1.5 0 0 0 0-3H9a3 3 0 0 1-3-3V6z" /></svg>);