import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" style={{
  width: "1rem",
  height: "1rem"
}} {...props}><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm5.9 7l-6.5 7.4c-.4.5-1.2.6-1.7.1l-3.5-3.1c-.3-.2-.3-.6-.1-.8l.8-.9c.2-.3.6-.3.8-.1l2.4 2.1c.1.1.3.1.3 0L16 7.4c.2-.2.6-.3.8-.1l.9.8c.3.3.4.6.2.9z" /></svg>);