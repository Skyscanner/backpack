import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style={{
  width: "1.5rem",
  height: "1.5rem"
}} {...props}><path d="M19.067 10.204l-9.221-6.73C8.275 2.328 6 3.39 6 5.271v13.458c0 1.88 2.275 2.943 3.846 1.797l9.221-6.73a2.197 2.197 0 0 0 0-3.592z" /></svg>);