import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" style={{
  width: "1rem",
  height: "1rem"
}} {...props}><path d="M11.288 20.703a1 1 0 0 0 1.425 0l6.672-6.778v-.002c3.175-3.597 3.424-7.135.938-9.711-2.203-2.282-5.867-1.097-8.183 1.526l-.14.144-.14-.144C9.544 3.115 5.88 1.93 3.678 4.212c-2.487 2.576-2.238 6.114.938 9.711l-.001.002z" /></svg>);