import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" style={{
  width: "1.125rem",
  height: "1.125rem"
}} {...props}><path d="M4.5 3a1.5 1.5 0 1 0 0 3h15a1.5 1.5 0 0 0 0-3h-15z" /><path fillRule="evenodd" d="M4.5 7.5A1.5 1.5 0 0 0 3 9v9a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V9a1.5 1.5 0 0 0-1.5-1.5h-15zM9 12a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm-1.5 6a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm6-6a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zM12 18a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm6-6a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" clipRule="evenodd" /></svg>);