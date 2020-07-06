import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" style={{
  width: "1.125rem",
  height: "1.125rem"
}} {...props}><path d="M13.5 0A1.5 1.5 0 0 0 12 1.5v3H9v-3a1.5 1.5 0 1 0-3 0v3H4.09A1.09 1.09 0 0 0 3 5.59V9a7.5 7.5 0 0 0 6.007 7.351A1.521 1.521 0 0 0 9 16.5v3a4.5 4.5 0 1 0 9 0v-1a.5.5 0 0 1 .5-.5h1a1.5 1.5 0 0 0 0-3h-1a3.5 3.5 0 0 0-3.5 3.5v1a1.5 1.5 0 0 1-3 0v-3c0-.05-.002-.1-.007-.149A7.502 7.502 0 0 0 18 9V5.59a1.09 1.09 0 0 0-1.09-1.09H15v-3A1.5 1.5 0 0 0 13.5 0z" /></svg>);