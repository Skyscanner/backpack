import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" style={{
  width: "1.125rem",
  height: "1.125rem"
}} {...props}><path d="M1.527 2.188c-.139-.276.279-.688.697-.688 1.95 0 2.909.688 3.776 3 1.065 2.418 2.015 5.056 2.576 6.693.165.482.625.807 1.143.807H16.5c1.5 0 3 1.5 3 3v1.5c0 .75-.75 1.5-1.5 1.5H6.3c-1.2 0-2.404-1.238-2.543-2.338L1.526 2.188zM3 19.5a1.5 1.5 0 0 0 0 3h18a1.5 1.5 0 0 0 0-3H3z" /></svg>);