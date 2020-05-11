import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" style={{
  width: "1.125rem",
  height: "1.125rem"
}} {...props}><path d="M12 4a8 8 0 11-8 8 8.009 8.009 0 018-8m0-2a10 10 0 1010 10A10 10 0 0012 2z" /><circle cx="8.5" cy="9.5" r="1.5" /><circle cx="15.5" cy="9.5" r="1.5" /><path d="M7.762 13a.505.505 0 00-.474.672 5 5 0 009.425 0 .505.505 0 00-.474-.672z" /></svg>);