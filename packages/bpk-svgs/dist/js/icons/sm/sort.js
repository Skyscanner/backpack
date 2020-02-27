import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" style={{
  width: "1rem",
  height: "1rem"
}} {...props}><path d="M5.2 15.4L12 21l6.8-5.6c.5-.5.1-1.4-.6-1.4H5.9c-.8 0-1.2.9-.7 1.4" /></svg>);