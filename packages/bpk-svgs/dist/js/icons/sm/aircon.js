import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" style={{
  width: "1.125rem",
  height: "1.125rem"
}} {...props}><path d="M16.5 10.6l3.6 1h.3c.6 0 1-.4 1-1 0-.5-.3-.9-.7-1l-1.6-.4 1.4-.8c.5-.3.6-.9.4-1.4-.3-.5-.9-.6-1.4-.4l-1.5.8.4-1.5c.1-.5-.2-1.1-.7-1.2-.5-.1-1.1.2-1.2.7l-.9 3.4-2.6 1.5v-3l2.5-2.5c.4-.4.4-1 0-1.4-.4-.4-1-.4-1.4 0l-1.1 1V3c0-.5-.4-1-1-1s-1 .5-1 1v1.4L9.9 3.3c-.4-.4-1-.4-1.4 0-.4.4-.4 1 0 1.4L11 7.2v3L8.3 8.7l-1-3.6a.8.8 0 0 0-1.1-.6c-.6.1-.9.7-.7 1.2l.4 1.6-1.2-.7c-.5-.2-1.1-.1-1.4.4-.2.5-.1 1.1.4 1.4l1.1.6-1.5.4c-.5.1-.9.7-.7 1.2.1.4.5.7 1 .7h.3l3.4-.9L10 12l-2.5 1.5-3.7-1c-.5-.1-1.1.2-1.2.7-.1.5.2 1.1.7 1.2l1.7.5-1.3.8c-.5.3-.6.9-.4 1.4s.9.6 1.4.4l1-.6-.3 1.3c-.1.5.2 1.1.7 1.2h.3c.5 0 .8-.3 1-.7l.9-3.2 2.9-1.7v2.8l-2.8 2.8c-.4.4-.4 1 0 1.4 0 .1.3.2.5.2.3 0 .5-.1.7-.3l1.4-1.4V21c0 .5.4 1 1 1s1-.5 1-1v-1.2l.9.9c.4.4 1 .4 1.4 0 .4-.4.4-1 0-1.4L13 17v-3.3l2.4 1.4 1 3.7c.1.4.5.7 1 .7h.3c.5-.1.9-.7.7-1.2l-.5-1.8 1.5.9c.5.3 1.1.1 1.4-.4.3-.5.1-1.1-.4-1.4l-1.3-.6 1.3-.3c.5-.1.9-.7.7-1.2-.1-.5-.7-.9-1.2-.7l-3.2.9L14 12l2.5-1.4z" /></svg>);