import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" style={{
  width: "1rem",
  height: "1rem"
}} {...props}><path d="M20.8 5l-5.2 1.1c-.7.1-.9 1-.3 1.6l.9 1-3 3H8.1c-.4 0-.8.2-1.1.4l-4.6 4.6c-.6.6-.6 1.5 0 2.1.6.6 1.5.6 2.1 0l4.1-4.1h5.2c.4 0 .8-.2 1.1-.4l3.4-3.4 1 1c.5.6 1.4.4 1.6-.3L22 6.2c.1-.7-.5-1.3-1.2-1.2z" /></svg>);