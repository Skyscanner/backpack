import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style={{
  width: "1.5rem",
  height: "1.5rem"
}} {...props}><path fillRule="evenodd" d="M17.079 3.01a3.913 3.913 0 0 1 3.913 3.912v4.476a3 3 0 0 1-.879 2.122l-6.631 6.63a3 3 0 0 1-4.243 0L3.85 14.763a3 3 0 0 1 0-4.242l6.632-6.632a3 3 0 0 1 2.121-.878zM15.604 8.4a1.5 1.5 0 1 1 2.121-2.122 1.5 1.5 0 0 1-2.121 2.121z" /></svg>);