import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style={{
  width: "1.5rem",
  height: "1.5rem"
}} {...props}><path d="M9 13a3 3 0 1 1 6 0 3 3 0 0 1-6 0z" /><path fillRule="evenodd" d="M5 6a3 3 0 0 0-3 3v9a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V9a3 3 0 0 0-3-3h-.763a3 3 0 0 1-2.426-1.235l-.385-.53A3 3 0 0 0 13 3h-2.181a3 3 0 0 0-2.427 1.235l-.684.941A2 2 0 0 1 6.091 6H5zm7 2a5 5 0 1 0 0 10 5 5 0 0 0 0-10z" clipRule="evenodd" /></svg>);