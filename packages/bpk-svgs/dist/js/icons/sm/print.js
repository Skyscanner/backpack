import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" style={{
  width: "1.125rem",
  height: "1.125rem"
}} {...props}><path d="M9 0a1.5 1.5 0 1 0 0 3h6a1.5 1.5 0 0 0 0-3H9z" /><path fillRule="evenodd" d="M0 9a4.5 4.5 0 0 1 4.5-4.5h15A4.5 4.5 0 0 1 24 9v6a4.5 4.5 0 0 1-4.5 4.5H18V21a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3v-1.5H4.5A4.5 4.5 0 0 1 0 15V9zm10.5 12A1.5 1.5 0 0 1 9 19.5v-6a1.5 1.5 0 0 1 1.5-1.5h3a1.5 1.5 0 0 1 1.5 1.5v6a1.5 1.5 0 0 1-1.5 1.5h-3zM6 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" clipRule="evenodd" /></svg>);