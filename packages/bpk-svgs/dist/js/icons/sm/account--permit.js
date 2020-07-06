import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" style={{
  width: "1.125rem",
  height: "1.125rem"
}} {...props}><path fillRule="evenodd" d="M6 0a3 3 0 0 0-3 3v18.919a1.5 1.5 0 0 0 1.974 1.423l6.552-2.184a1.5 1.5 0 0 1 .948 0l6.552 2.184A1.5 1.5 0 0 0 21 21.919V3a3 3 0 0 0-3-3H6zm11.526 8.63a1.536 1.536 0 0 0 .068-2.15 1.486 1.486 0 0 0-2.12-.069l-4.376 4.234L8.62 8.031a1.486 1.486 0 0 0-2.118-.126 1.535 1.535 0 0 0-.124 2.147L10.902 15l6.624-6.37z" clipRule="evenodd" /></svg>);