import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" style={{
  width: "1rem",
  height: "1rem"
}} {...props}><path d="M19.64 21.28L14.05 10.1a.5.5 0 0 1-.05-.22V2.5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v7.38a.5.5 0 0 1-.05.22L4.36 21.28a.5.5 0 0 0 .45.72h14.38a.5.5 0 0 0 .45-.72zm-3.3-1.61a.75.75 0 0 1-1-.34l-3-6a.75.75 0 0 1 1.34-.67l3 6a.75.75 0 0 1-.35 1.01z" /></svg>);