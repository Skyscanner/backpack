import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" style={{
  width: "1rem",
  height: "1rem"
}} {...props}><path d="M16 2H4.5c-.3 0-.5.2-.5.5v19c0 .3.2.5.5.5H16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-5 15c-1.7 0-3-1.3-3-3s1.3-3 3-3 3 1.3 3 3-1.3 3-3 3zM9 8V7h4v1H9zm5-2H8V5h6v1zm6-2v16c0 1.1-.9 2-2 2 0-.2.1-.3.2-.4.5-.4.8-.9.8-1.6V4c0-.6-.3-1.2-.8-1.6-.1-.1-.2-.2-.2-.4 1.1 0 2 .9 2 2z" /></svg>);