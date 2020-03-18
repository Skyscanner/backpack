import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" style={{
  width: "1.125rem",
  height: "1.125rem"
}} {...props}><path d="M21 20h-1.32c-.72 0-1.68-.585-1.68-1.306V17H6v1.694c0 .681-.857 1.24-1.557 1.3L4.32 20H3v-7.5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2zM18.308 4a2 2 0 0 1 2 2v3.778H18.23V8.61a1 1 0 0 0-.884-.993l-.116-.007h-3.539a1 1 0 0 0-.993.883l-.007.117v1.167h-1.384V8.61a1 1 0 0 0-.884-.993l-.116-.007H6.769a1 1 0 0 0-.993.883l-.007.117v1.167H3.692V6a2 2 0 0 1 2-2z" /></svg>);