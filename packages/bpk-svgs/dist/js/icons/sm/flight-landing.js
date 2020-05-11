import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" style={{
  width: "1.125rem",
  height: "1.125rem"
}} {...props}><path d="M22 18v2H4v-2zM4.832 9.132l4.49 1.86-3.52 3.52 1.538.524 5.736-2.489 4.186 1.734a1.25 1.25 0 00.957-2.31L5.624 6.754 4.163 3.443l-1.155-.478L3.295 7a2.5 2.5 0 001.537 2.133zm6.996-3.849l-.985-.408-.115 2.692 3.778 1.531zM14 15.001a1 1 0 101-1 1 1 0 00-1 1z" /></svg>);