import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" style={{
  width: "1rem",
  height: "1rem"
}} {...props}><path d="M2 18h18v2H2zM21.904 4.887a1.25 1.25 0 0 0-1.633-.677L7.676 9.427 4.301 8.119l-1.155.478 3.056 2.65a2.5 2.5 0 0 0 2.595.421l4.49-1.86v4.978l1.458-.717 2.296-5.816h-.001l4.188-1.735a1.25 1.25 0 0 0 .677-1.633zm-6.292-.082l-4.591-.804-.985.408 1.822 1.984z" /></svg>);