import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" style={{
  width: "1.125rem",
  height: "1.125rem"
}} {...props}><path d="M13 7.1v-5a10 10 0 016.74 16.28l-3.57-3.57A5 5 0 0013 7.1zM12 17a5 5 0 01-1-9.9v-5a10 10 0 107.33 17.69l-3.57-3.57A5 5 0 0112 17z" /></svg>);