import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style={{
  width: "1.5rem",
  height: "1.5rem"
}} {...props}><path d="M4 7a3 3 0 0 1 3-3h5a1 1 0 1 0 0-2H7a5 5 0 0 0-5 5v10a5 5 0 0 0 5 5h10a5 5 0 0 0 5-5v-5a1 1 0 1 0-2 0v5a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V7z" /><path d="M16.07 6.71a1 1 0 0 1 1.41 0 1 1 0 0 1 0 1.41L10.6 15H13a1 1 0 1 1 0 2H8a1 1 0 0 1-1-1v-5a1 1 0 1 1 2 0v2.77l7.07-7.06z" /></svg>);