import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" style={{
  width: "1.125rem",
  height: "1.125rem"
}} {...props}><path fillRule="evenodd" d="M22.5 12c0 5.799-4.701 10.5-10.5 10.5S1.5 17.799 1.5 12 6.201 1.5 12 1.5 22.5 6.201 22.5 12zm-9 4.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zM10.5 6a1.5 1.5 0 1 0 0 3h2.25a.75.75 0 0 1 0 1.5H12a1.5 1.5 0 0 0 0 3h.75a3.75 3.75 0 1 0 0-7.5H10.5z" clipRule="evenodd" /></svg>);