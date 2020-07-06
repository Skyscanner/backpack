import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style={{
  width: "1.5rem",
  height: "1.5rem"
}} {...props}><path d="M7 17.293V6.707c0-1.454 1.638-2.24 2.701-1.296l5.724 5.081a1.75 1.75 0 0 1 .049 2.547L9.75 18.544C8.7 19.553 7 18.779 7 17.293z" /></svg>);