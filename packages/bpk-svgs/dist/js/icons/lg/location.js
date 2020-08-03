import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style={{
  width: "1.5rem",
  height: "1.5rem"
}} {...props}><path d="M12.001 1a6.001 6.001 0 0 1 2.822 11.297c-.768.41-1.767.833-1.822 1.703v8a1.023 1.023 0 0 1-.969 1 1.08 1.08 0 0 1-1.031-1v-8c-.058-.87-1.03-1.285-1.8-1.693A6 6 0 0 1 12.001 1z" /></svg>);