import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" style={{
  width: "1.125rem",
  height: "1.125rem"
}} {...props}><path d="M9 7.463v9.074c0 1.246 1.365 1.92 2.251 1.11l4.77-4.354c.622-.568.641-1.59.04-2.184l-4.77-4.718C10.419 5.526 9 6.19 9 7.463z" /></svg>);