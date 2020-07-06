import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" style={{
  width: "1.125rem",
  height: "1.125rem"
}} {...props}><path fillRule="evenodd" d="M1.5 12c0 5.798 4.7 10.5 10.5 10.5S22.5 17.798 22.5 12 17.8 1.5 12 1.5 1.5 6.202 1.5 12zM12 8.996A1.498 1.498 0 1 0 12 6a1.498 1.498 0 0 0 0 2.996zm.003 9.006a1.5 1.5 0 0 0 1.49-1.326l.01-.175L13.5 12l-.01-.175a1.5 1.5 0 0 0-2.98 0l-.01.176.003 4.501.01.175a1.5 1.5 0 0 0 1.49 1.325z" clipRule="evenodd" /></svg>);