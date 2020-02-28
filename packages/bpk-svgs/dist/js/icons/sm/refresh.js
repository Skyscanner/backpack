import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" style={{
  width: "1rem",
  height: "1rem"
}} {...props}><path d="M21.3 12H20c0-4.4-3.6-8-8-8-1.8 0-3.5.6-4.8 1.6-.5.4-.5 1.1-.1 1.5s.9.4 1.3.1C9.4 6.4 10.7 6 12 6c3.3 0 6 2.7 6 6h-1.3c-.5 0-.9.6-.6 1l2.3 3.7c.3.4.9.4 1.2 0l2.3-3.7c.3-.4-.1-1-.6-1zm-5.7 4.8c-1 .8-2.2 1.2-3.6 1.2-3.3 0-6-2.7-6-6h1.3c.5 0 .9-.6.6-1L5.6 7.3c-.3-.4-.9-.4-1.2 0L2.1 11c-.3.4.1 1 .6 1H4c0 4.4 3.6 8 8 8 1.8 0 3.5-.6 4.8-1.6.5-.4.5-1.1.1-1.5s-.9-.4-1.3-.1z" /></svg>);