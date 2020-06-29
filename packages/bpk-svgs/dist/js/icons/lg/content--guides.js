import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style={{
  width: "1.5rem",
  height: "1.5rem"
}} {...props}><path fillRule="evenodd" d="M4 4.5A2.5 2.5 0 0 1 6.5 2H18c1.5 0 3 1.5 3 3v12c0 1-1 2-2 2H6.5c-.276 0-.51.237-.378.48A1 1 0 0 0 7 20h11c.5 0 1 .5 1 1s-.5 1-1 1H7c-1.5 0-3-1.5-3-3V4.5zM8 8a1 1 0 0 1 1-1h7a1 1 0 1 1 0 2H9a1 1 0 0 1-1-1zm1 3a1 1 0 1 0 0 2h5a1 1 0 1 0 0-2H9z" clipRule="evenodd" /></svg>);