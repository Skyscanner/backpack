import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style={{
  width: "1.5rem",
  height: "1.5rem"
}} {...props}><path fillRule="evenodd" d="M2 12C2 6.5 6.5 2 12 2s10 4.5 10 10-4.5 10-10 10S2 17.5 2 12zm14.707-2.142a1.16 1.16 0 0 0 0-1.54.944.944 0 0 0-1.414 0l-4.357 4.743-2.299-2.068c-.426-.383-1.056-.317-1.408.146-.352.463-.292 1.15.134 1.532L11.064 16l5.643-6.142z" clipRule="evenodd" /></svg>);