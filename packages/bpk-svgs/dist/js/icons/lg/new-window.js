import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style={{
  width: "1.5rem",
  height: "1.5rem"
}} {...props}><path d="M12.9 12.3c-.4.4-1 .4-1.4 0-.4-.4-.4-1 0-1.4L18.4 4H16c-.6 0-1-.4-1-1s.4-1 1-1h5c.6 0 1 .4 1 1v5c0 .6-.4 1-1 1s-1-.4-1-1V5.2l-7.1 7.1z" /><path d="M4 9a3 3 0 0 1 3-3h4a1 1 0 1 0 0-2H7a5 5 0 0 0-5 5v8a5 5 0 0 0 5 5h8a5 5 0 0 0 5-5v-4a1 1 0 1 0-2 0v4a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V9z" /></svg>);