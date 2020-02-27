import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" style={{
  width: "1rem",
  height: "1rem"
}} {...props}><path d="M20 5H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 2.5V9H4V7.5c0-.3.2-.5.5-.5h15c.3 0 .5.2.5.5zm-16 9V12h16v4.5c0 .3-.2.5-.5.5h-15c-.3 0-.5-.2-.5-.5zM5 14h2v2H5v-2z" /></svg>);