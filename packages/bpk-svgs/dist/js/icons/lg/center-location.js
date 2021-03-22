import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style={{
  width: "1.5rem",
  height: "1.5rem"
}} {...props}><path d="M6 4a2 2 0 0 0-2 2v2a1 1 0 0 1-2 0V6a4 4 0 0 1 4-4h2a1 1 0 0 1 0 2H6zm9-1a1 1 0 0 1 1-1h2a4 4 0 0 1 4 4v2a1 1 0 1 1-2 0V6a2 2 0 0 0-2-2h-2a1 1 0 0 1-1-1zM3 15a1 1 0 0 1 1 1v2a2 2 0 0 0 2 2h2a1 1 0 1 1 0 2H6a4 4 0 0 1-4-4v-2a1 1 0 0 1 1-1zm18 0a1 1 0 0 1 1 1v2a4 4 0 0 1-4 4h-2a1 1 0 1 1 0-2h2a2 2 0 0 0 2-2v-2a1 1 0 0 1 1-1zm-8-.738c0-.229.156-.425.37-.503A4.002 4.002 0 0 0 12 6a4 4 0 0 0-1.37 7.76c.214.077.37.273.37.502V17a1 1 0 1 0 2 0v-2.738z" /></svg>);