import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" style={{
  width: "1.125rem",
  height: "1.125rem"
}} {...props}><path d="M15 20h-2v-9l6.9-8.2c.3-.3 0-.8-.4-.8h-15c-.4 0-.6.5-.4.8L11 11v9H9c-1.1 0-2 .9-2 2h10c0-1.1-.9-2-2-2zM10 7c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2z" /></svg>);