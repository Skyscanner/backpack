import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style={{
  width: "1.5rem",
  height: "1.5rem"
}} {...props}><path fillRule="evenodd" d="M7 3a4 4 0 0 0-4 4v10a4 4 0 0 0 4 4h10a4 4 0 0 0 4-4V7a4 4 0 0 0-4-4H7zm9.707 6.858a1.16 1.16 0 0 0 0-1.54.944.944 0 0 0-1.414 0l-4.357 4.743-2.299-2.068c-.426-.383-1.056-.317-1.408.146-.352.463-.292 1.15.134 1.532L11.064 16l5.643-6.142z" clipRule="evenodd" /></svg>);