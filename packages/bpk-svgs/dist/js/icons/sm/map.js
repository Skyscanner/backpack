import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" style={{
  width: "1rem",
  height: "1rem"
}} {...props}><path d="M20 3.5c-.1 0-.3 0-.4.1l-4.1 2.1c-.1.1-.3.1-.4.1s-.3 0-.4-.1L9.4 3.1C9.3 3 9.2 3 9 3s-.3 0-.4.1l-5 2.5c-.4.2-.6.5-.6.9v13c0 .6.5 1 1 1 .1 0 .3 0 .4-.1l4.1-2.1c.1-.1.3-.1.4-.1s.3 0 .4.1l5.1 2.6c.3.1.4.1.6.1s.3 0 .4-.1l5-2.5c.3-.2.6-.5.6-.9v-13c0-.6-.5-1-1-1zM9 5.1v10.8l-4 2V7.1l4-2zm6 13.8V8.1l1.3-.6.3-.1L19 6.1v10.7l-4 2.1z" /></svg>);