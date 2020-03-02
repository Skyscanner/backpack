import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" style={{
  width: "1.125rem",
  height: "1.125rem"
}} {...props}><path d="M21 4h-3.6c-.6 0-1.1.2-1.5.6L2 20h14.1l5.8-14.6c.3-.7-.2-1.4-.9-1.4z" /></svg>);