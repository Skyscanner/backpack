import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" style={{
  width: "1.125rem",
  height: "1.125rem"
}} {...props}><path fillRule="evenodd" d="M19.5 10.5a9 9 0 1 1-18 0 9 9 0 0 1 18 0zm-3 0a6 6 0 1 1-12 0 6 6 0 0 1 12 0z" clipRule="evenodd" /><path d="M18 18c.63-.632 1.265-1.024 1.414-.874l2.612 2.61a1.62 1.62 0 0 1-2.29 2.29l-2.61-2.612c-.15-.15.242-.782.874-1.414z" /></svg>);