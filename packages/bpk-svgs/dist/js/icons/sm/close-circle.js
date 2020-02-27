import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" style={{
  width: "1rem",
  height: "1rem"
}} {...props}><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm4.8 12.9c.3.3.3.7 0 .9l-.9.9c-.3.3-.7.3-.9 0l-3-2.8-2.9 2.9c-.3.3-.7.3-.9 0l-.9-.9c-.3-.3-.3-.7 0-.9l2.9-2.9-3-3c-.3-.3-.3-.7 0-.9l.9-.9c.3-.3.7-.3.9 0l2.9 2.9 2.9-2.9c.3-.3.7-.3.9 0l.9.9c.3.3.3.7 0 .9L13.9 12l2.9 2.9z" /></svg>);