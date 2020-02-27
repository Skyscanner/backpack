import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" style={{
  width: "1rem",
  height: "1rem"
}} {...props}><path d="M3 8.625L8.714 7.5 13 3v18l-4.286-4.5L3 15.375zM20 12a7.979 7.979 0 0 1-2.343 5.657l1.411 1.411a9.985 9.985 0 0 0 0-14.136l-1.411 1.411A7.979 7.979 0 0 1 20 12zm-3.759-4.241l-1.413 1.413a4 4 0 0 1 0 5.656l1.413 1.413a5.992 5.992 0 0 0 0-8.482z" /></svg>);