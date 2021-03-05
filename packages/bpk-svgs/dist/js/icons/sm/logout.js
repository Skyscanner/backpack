import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" style={{
  width: "1.125rem",
  height: "1.125rem"
}} {...props}><path d="M10.5 10.5a1.5 1.5 0 0 0 0 3h6.879l-1.94 1.94a1.5 1.5 0 0 0 2.122 2.12l4.5-4.5a1.5 1.5 0 0 0 0-2.12l-4.5-4.5a1.5 1.5 0 0 0-2.122 2.12l1.94 1.94H10.5z" /><path d="M9.75 4.5a1.5 1.5 0 0 0 0-3H6A4.5 4.5 0 0 0 1.5 6v12A4.5 4.5 0 0 0 6 22.5h3.75a1.5 1.5 0 0 0 0-3H6A1.5 1.5 0 0 1 4.5 18V6A1.5 1.5 0 0 1 6 4.5h3.75z" /></svg>);