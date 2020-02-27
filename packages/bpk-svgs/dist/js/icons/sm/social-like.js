import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" style={{
  width: "1rem",
  height: "1rem"
}} {...props}><path d="M18.2 3C21 3 21 4.1 21 5.9V14c0 2.4-.5 2.9-2.8 2.9h-3.6L12 21l-2.5-4H5.8C3.3 17 3 16.4 3 13.7V5.9C3 4 3.1 3 5.8 3h12.4zm-5.3 3.6c-.4.3-.6.6-.9 1 0 .1-.1.1-.1 0-.2-.4-.5-.8-.9-1.1-.9-.7-2.4-.5-3.2.5-.9 1.1-.8 2.8.2 3.8l3.7 4.1c.2.2.5.2.7 0l3.7-4.1c.9-1 1-2.7.1-3.7-.8-1.1-2.2-1.3-3.3-.5z" /></svg>);