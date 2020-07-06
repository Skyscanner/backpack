import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style={{
  width: "1.5rem",
  height: "1.5rem"
}} {...props}><path fillRule="evenodd" d="M14.293 17.707a1 1 0 0 0 1.414 0l5-5a1 1 0 0 0 0-1.414l-5-5a1 1 0 1 0-1.414 1.414L17.586 11H4a1 1 0 1 0 0 2h13.586l-3.293 3.293a1 1 0 0 0 0 1.414z" clipRule="evenodd" /></svg>);