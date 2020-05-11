import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style={{
  width: "1.5rem",
  height: "1.5rem"
}} {...props}><path d="M20.7 7.05l-8.42-4a.67.67 0 00-.57 0L3.31 7c-.54.3-.31 1 .28 1H20.4c.6 0 .83-.69.3-.95zM3 18h18v2H3zm2-9h2v8H5zm4 0h2v8H9zm4 0h2v8h-2zm4 0h2v8h-2z" /></svg>);