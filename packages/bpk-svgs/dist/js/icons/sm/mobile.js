import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" style={{
  width: "1rem",
  height: "1rem"
}} {...props}><path d="M17 2H7c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 18H8v-1h8v1zm.5-2h-9c-.3 0-.5-.2-.5-.5v-13c0-.2.2-.5.5-.5h9c.3 0 .5.3.5.5v13c0 .3-.2.5-.5.5z" /></svg>);