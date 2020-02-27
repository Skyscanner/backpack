import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" style={{
  width: "1rem",
  height: "1rem"
}} {...props}><path d="M10 8c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm.5 3c-.8 0-1.5.7-1.5 1.5v4c0 .3.2.5.5.5h.5l1 5h2l1-5h.5c.3 0 .5-.2.5-.5v-4c0-.8-.7-1.5-1.5-1.5h-3z" /></svg>);