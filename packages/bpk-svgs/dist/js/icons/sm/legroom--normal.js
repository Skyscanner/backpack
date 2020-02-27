import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" style={{
  width: "1rem",
  height: "1rem"
}} {...props}><path d="M5 12V3H3v9a5 5 0 0 0 5 5h6v-2H8a3 3 0 0 1-3-3zm15.5 6H19v-7a2.006 2.006 0 0 0-2-2h-5V3H6v8a3.009 3.009 0 0 0 3 3h7v7h4.5a1.5 1.5 0 0 0 0-3z" /></svg>);