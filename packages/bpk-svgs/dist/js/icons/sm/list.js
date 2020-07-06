import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" style={{
  width: "1.125rem",
  height: "1.125rem"
}} {...props}><path d="M4.5 4.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0 7.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0 7.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm3-15A1.5 1.5 0 0 1 9 3h12a1.5 1.5 0 0 1 0 3H9a1.5 1.5 0 0 1-1.5-1.5zm0 7.5A1.5 1.5 0 0 1 9 10.5h12a1.5 1.5 0 0 1 0 3H9A1.5 1.5 0 0 1 7.5 12zm0 7.5A1.5 1.5 0 0 1 9 18h12a1.5 1.5 0 0 1 0 3H9a1.5 1.5 0 0 1-1.5-1.5z" /></svg>);