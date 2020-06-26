import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style={{
  width: "1.5rem",
  height: "1.5rem"
}} {...props}><path fillRule="evenodd" d="M5 10a7 7 0 0 1 14 0v.64a10 10 0 0 0 1.056 4.471l.497.995A2 2 0 0 1 18.763 19H5.237a2 2 0 0 1-1.789-2.894l.497-.995A10 10 0 0 0 5 10.64V10zm7-3a1 1 0 0 0-1 1v2H9a1 1 0 1 0 0 2h2v2a1 1 0 1 0 2 0v-2h2a1 1 0 1 0 0-2h-2V8a1 1 0 0 0-1-1z" clipRule="evenodd" /><path d="M9.08 20.959c-.28-.485.216-.959.801-.959h4.238c.585 0 1.081.474.8.959A2.141 2.141 0 0 1 13.059 22h-2.118c-.803 0-1.5-.42-1.86-1.041z" /></svg>);