import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" style={{
  width: "1.125rem",
  height: "1.125rem"
}} {...props}><path fillRule="evenodd" d="M22.5 12c0 5.799-4.701 10.5-10.5 10.5S1.5 17.799 1.5 12 6.201 1.5 12 1.5 22.5 6.201 22.5 12zM12 4.5a1.5 1.5 0 0 0-1.498 1.575 3.751 3.751 0 0 0 .748 7.425h2.25a.75.75 0 0 1 0 1.5H9a1.5 1.5 0 0 0 0 3h1.5a1.5 1.5 0 0 0 3 0 3.75 3.75 0 1 0 0-7.5h-2.25a.75.75 0 0 1 0-1.5H15a1.5 1.5 0 0 0 0-3h-1.5A1.5 1.5 0 0 0 12 4.5z" clipRule="evenodd" /></svg>);