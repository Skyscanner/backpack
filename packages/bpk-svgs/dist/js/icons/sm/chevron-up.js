import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" style={{
  width: "1.125rem",
  height: "1.125rem"
}} {...props}><path d="M12 8.5l7.2 6.4c.6.6.7 1.5.1 2.1-.5.6-1.5.7-2.1.1L12 12.5l-5.2 4.6c-.6.6-1.6.5-2.1-.1s-.5-1.6.1-2.1L12 8.5z" /></svg>);