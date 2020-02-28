import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" style={{
  width: "1rem",
  height: "1rem"
}} {...props}><path d="M21 7h-6V5h6zm0 6v-2h-2v2zm-8 4v2h8v-2zm-1.5-8.5A2.5 2.5 0 1 0 9.211 5H3v2h6.211A2.5 2.5 0 0 0 11.5 8.5zm4 6a2.5 2.5 0 1 0-2.306-3.464H3v2h10.231A2.5 2.5 0 0 0 15.5 14.5zm-6 1A2.5 2.5 0 0 0 7.211 17H3v2h4.211A2.5 2.5 0 1 0 9.5 15.5z" /></svg>);