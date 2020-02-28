import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" style={{
  width: "1rem",
  height: "1rem"
}} {...props}><path d="M13.058 9.075h1.7v5.9c0 .8.7 1.5 1.5 1.5s1.5-.7 1.5-1.5v-5.9h1.7c.6 0 .9-.6.7-1.1l-3.2-5.6c-.3-.5-1-.5-1.3 0l-3.3 5.6c-.3.5.1 1.1.7 1.1zm-4.396 11.68l3.2-5.6c.3-.5-.1-1.1-.7-1.1h-1.7v-5.9c0-.8-.7-1.5-1.5-1.5s-1.5.7-1.5 1.5v5.9h-1.7c-.6 0-.9.6-.7 1.1l3.2 5.6c.3.5 1.1.5 1.4 0z" /></svg>);