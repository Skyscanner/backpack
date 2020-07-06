import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" style={{
  width: "1.125rem",
  height: "1.125rem"
}} {...props}><path fillRule="evenodd" d="M22.5 12c0 5.799-4.701 10.5-10.5 10.5S1.5 17.799 1.5 12 6.201 1.5 12 1.5 22.5 6.201 22.5 12zm-6.364 6.257A7.5 7.5 0 0 1 5.742 7.864l10.394 10.393zm2.121-2.12L7.864 5.742a7.5 7.5 0 0 1 10.393 10.393z" clipRule="evenodd" /></svg>);