import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" style={{
  width: "1.125rem",
  height: "1.125rem"
}} {...props}><path d="M3 22.5a3 3 0 0 1-3-3v-15a3 3 0 0 1 3-3h13.5a1.5 1.5 0 0 1 0 3H3.75a.75.75 0 0 0 0 1.5H18a3 3 0 0 1 3 3h-3a4.5 4.5 0 0 0-4.5 4.5V15a4.5 4.5 0 0 0 4.5 4.5h3a3 3 0 0 1-3 3H3z" /><path fillRule="evenodd" d="M15 13.5a3 3 0 0 1 3-3h3a3 3 0 0 1 3 3V15a3 3 0 0 1-3 3h-3a3 3 0 0 1-3-3v-1.5zm7.5.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0z" clipRule="evenodd" /></svg>);