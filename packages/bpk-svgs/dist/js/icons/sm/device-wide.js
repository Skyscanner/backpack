import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" style={{
  width: "1.125rem",
  height: "1.125rem"
}} {...props}><path d="M18 6H6a2 2 0 00-2 2v8a1 1 0 001 1h14a1 1 0 001-1V8a2 2 0 00-2-2zM6 16V8h12v8zm16 1H2a2 2 0 002 2h16a2 2 0 002-2z" /></svg>);