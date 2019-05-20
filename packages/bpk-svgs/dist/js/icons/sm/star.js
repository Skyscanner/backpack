import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" style={{
  width: "1.125rem",
  height: "1.125rem"
}} {...props}><path d="M12.8 3.5L15 8c.1.3.4.4.7.5l4.6.7c.7.1 1 1 .5 1.5L17 14.2c-.2.2-.3.5-.3.8l1.5 5c.1.7-.6 1.3-1.3.9l-4.4-3c-.3-.1-.6-.1-.8 0l-4.4 3c-.6.3-1.4-.2-1.3-.9l1.5-5c0-.3 0-.6-.3-.8l-3.8-3.5c-.7-.5-.4-1.4.4-1.5l4.6-.7c.2-.1.5-.2.6-.5l2.2-4.5c.3-.7 1.3-.7 1.6 0z" /></svg>);