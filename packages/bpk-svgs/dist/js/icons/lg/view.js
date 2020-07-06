import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style={{
  width: "1.5rem",
  height: "1.5rem"
}} {...props}><path d="M12 14c1.062 0 2-.896 2-2s-.938-2-2-2-2 .896-2 2 .938 2 2 2z" /><path fillRule="evenodd" d="M1.6 13.809a3.025 3.025 0 0 1 0-3.615A12.978 12.978 0 0 1 12 5c4.259 0 8.033 2.042 10.4 5.194.8 1.063.8 2.551 0 3.615A12.98 12.98 0 0 1 12 19a12.98 12.98 0 0 1-10.4-5.191zM7 12c0 2.76 2.344 5 5 5 2.655 0 5-2.24 5-5 0-2.761-2.345-5-5-5-2.656 0-5 2.239-5 5z" clipRule="evenodd" /></svg>);