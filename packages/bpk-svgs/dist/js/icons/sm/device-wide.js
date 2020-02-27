import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="null" height="null" style={{
  width: "3.5rem/3",
  height: "3.5rem/3"
}} {...props}><path d="M18 6H6a2 2 0 0 0-2 2v8a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V8a2 2 0 0 0-2-2zM6 16V8h12v8zm16 1H2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2z" /></svg>);