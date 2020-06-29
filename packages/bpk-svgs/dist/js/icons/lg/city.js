import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style={{
  width: "1.5rem",
  height: "1.5rem"
}} {...props}><path fillRule="evenodd" d="M3 6a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4h4c1 0 2 1 2 2v13a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-1.5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5V21a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1V8c0-1 1-2 2-2a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v15a1 1 0 0 1-2 0V6zm12 4a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-1 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm1 2a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3-5a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm1 2a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-1 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" clipRule="evenodd" /><path d="M9 7a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-1 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm1-4a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-1 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" /></svg>);