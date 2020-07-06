import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" style={{
  width: "1.125rem",
  height: "1.125rem"
}} {...props}><path d="M20 9.904l-9.88-7.85C8.438.715 6 1.954 6 4.148V19.85c0 2.194 2.437 3.433 4.12 2.096l9.88-7.85c1.333-1.059 1.333-3.133 0-4.192z" /></svg>);