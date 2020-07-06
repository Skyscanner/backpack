import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style={{
  width: "1.5rem",
  height: "1.5rem"
}} {...props}><path fillRule="evenodd" d="M14.306 2.955l6.739 6.74a3.26 3.26 0 0 1 0 4.61l-6.74 6.74a3.26 3.26 0 0 1-4.61 0l-6.74-6.74a3.26 3.26 0 0 1 0-4.61l6.74-6.74a3.26 3.26 0 0 1 4.61 0zM12 17a1 1 0 0 1-1-1v-5a1 1 0 1 1 2 0v5a1 1 0 0 1-1 1zm0-8a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" clipRule="evenodd" /></svg>);