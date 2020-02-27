import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" style={{
  width: "1rem",
  height: "1rem"
}} {...props}><path d="M20 9v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9h2v10.75a.25.25 0 0 0 .25.25h11.5a.25.25 0 0 0 .25-.25V9zm-9-3v10h2V6l2.5 2.5L17 7l-5-5-5 5 1.5 1.5z" /></svg>);