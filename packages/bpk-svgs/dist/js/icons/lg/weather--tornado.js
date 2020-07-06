import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style={{
  width: "1.5rem",
  height: "1.5rem"
}} {...props}><path d="M3 4a1 1 0 0 0 0 2h18a1 1 0 1 0 0-2H3zm2 3a1 1 0 0 0 0 2h14a1 1 0 1 0 0-2H5zm1 4a1 1 0 0 1 1-1h13a1 1 0 1 1 0 2H7a1 1 0 0 1-1-1zm6 2a1 1 0 1 0 0 2h7a1 1 0 1 0 0-2h-7zm-1 4a1 1 0 0 1 1-1h4a1 1 0 1 1 0 2h-4a1 1 0 0 1-1-1zm0 2a1 1 0 1 0 0 2h2a1 1 0 1 0 0-2h-2z" /></svg>);