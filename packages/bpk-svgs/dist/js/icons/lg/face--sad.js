import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style={{
  width: "1.5rem",
  height: "1.5rem"
}} {...props}><path d="M12 4a8 8 0 11-8 8 8.009 8.009 0 018-8m0-2a10 10 0 1010 10A10 10 0 0012 2zm-3.5 8a1.5 1.5 0 101.5 1.5A1.5 1.5 0 008.5 10zm7 0a1.5 1.5 0 101.5 1.5 1.5 1.5 0 00-1.5-1.5zm.771 6.47a4.928 4.928 0 00-8.59.083l.46.46a7.882 7.882 0 017.638-.05z" /></svg>);