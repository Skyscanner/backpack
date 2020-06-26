import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" style={{
  width: "1.125rem",
  height: "1.125rem"
}} {...props}><path fillRule="evenodd" d="M4.5 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3H18a4.5 4.5 0 0 0 4.5-4.5v-9a1.5 1.5 0 0 0-3 0v9a1.5 1.5 0 0 1-.78 1.317c-.364.198-.72-.153-.72-.567V6a3 3 0 0 0-3-3H4.5zm.75 4.5a.75.75 0 0 0 0 1.5h9a.75.75 0 0 0 0-1.5h-9zm5.25 3.75a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 0 1.5h-3a.75.75 0 0 1-.75-.75zm.75 2.25a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3zM4.5 12A1.5 1.5 0 0 1 6 10.5h1.5A1.5 1.5 0 0 1 9 12v1.5A1.5 1.5 0 0 1 7.5 15H6a1.5 1.5 0 0 1-1.5-1.5V12z" clipRule="evenodd" /></svg>);