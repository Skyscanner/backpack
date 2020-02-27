import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" style={{
  width: "1rem",
  height: "1rem"
}} {...props}><path d="M12 4a8 8 0 1 1-8 8 8.009 8.009 0 0 1 8-8m0-2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm-3.5 8a1.5 1.5 0 1 0 1.5 1.5A1.5 1.5 0 0 0 8.5 10zm7 0a1.5 1.5 0 1 0 1.5 1.5 1.5 1.5 0 0 0-1.5-1.5zm.771 6.47a4.928 4.928 0 0 0-8.59.083l.46.46a7.882 7.882 0 0 1 7.638-.05z" /></svg>);