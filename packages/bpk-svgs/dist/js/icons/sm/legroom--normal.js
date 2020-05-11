import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" style={{
  width: "1.125rem",
  height: "1.125rem"
}} {...props}><path d="M5 12V3H3v9a5 5 0 005 5h6v-2H8a3 3 0 01-3-3zm15.5 6H19v-7a2.006 2.006 0 00-2-2h-5V3H6v8a3.009 3.009 0 003 3h7v7h4.5a1.5 1.5 0 000-3z" /></svg>);