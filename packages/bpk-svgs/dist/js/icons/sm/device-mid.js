import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" style={{
  width: "1.125rem",
  height: "1.125rem"
}} {...props}><path d="M19.123 3a3.375 3.375 0 0 1 3.375 3.375v11.253a3.375 3.375 0 0 1-3.375 3.375H4.875A3.375 3.375 0 0 1 1.5 17.628V6.375A3.375 3.375 0 0 1 4.875 3h14.248zm-5.998 14.25h-2.25a1.125 1.125 0 1 0 0 2.25h2.25a1.125 1.125 0 0 0 0-2.25z" /></svg>);