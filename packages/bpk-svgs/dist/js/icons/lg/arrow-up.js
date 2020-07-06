import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style={{
  width: "1.5rem",
  height: "1.5rem"
}} {...props}><path d="M17.293 16H6.707c-1.454 0-2.24-1.638-1.296-2.701l5.081-5.724a1.75 1.75 0 0 1 2.547-.049l5.505 5.724c1.009 1.049.235 2.75-1.251 2.75z" /></svg>);