import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style={{
  width: "1.5rem",
  height: "1.5rem"
}} {...props}><path fillRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12zm5.114-3.074a1.5 1.5 0 1 1 .325 1.635 1.5 1.5 0 0 1-.325-1.635zm8.386-.927a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm-.332 9.556a1 1 0 0 0 1.664-1.11C15.597 14.593 13.772 14 12 14c-1.771 0-3.597.593-4.832 2.445a1 1 0 1 0 1.664 1.11C9.597 16.407 10.698 16 12 16s2.402.407 3.168 1.555z" clipRule="evenodd" /></svg>);