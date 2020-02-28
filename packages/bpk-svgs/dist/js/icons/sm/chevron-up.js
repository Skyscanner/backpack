import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" style={{
  width: "1rem",
  height: "1rem"
}} {...props}><path d="M12 8.5l7.2 6.4c.6.6.7 1.5.1 2.1-.5.6-1.5.7-2.1.1L12 12.5l-5.2 4.6c-.6.6-1.6.5-2.1-.1s-.5-1.6.1-2.1L12 8.5z" /></svg>);