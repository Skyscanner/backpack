import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" style={{
  width: "1.125rem",
  height: "1.125rem"
}} {...props}><g fillRule="evenodd"><path d="M3 13.06a1.5 1.5 0 0 1 1.5 1.5v3.75a1.5 1.5 0 0 0 1.5 1.5h12a1.5 1.5 0 0 0 1.5-1.5v-3.75a1.5 1.5 0 0 1 3 0v3.75a4.5 4.5 0 0 1-4.5 4.5H6a4.5 4.5 0 0 1-4.5-4.5v-3.75a1.5 1.5 0 0 1 1.5-1.5z" /><path d="M12 15.31a1.5 1.5 0 0 1-1.5-1.5V6.931l-1.94 1.94a1.5 1.5 0 0 1-2.12-2.122L12 1.19l5.56 5.56a1.5 1.5 0 0 1-2.12 2.122L13.5 6.93v6.88a1.5 1.5 0 0 1-1.5 1.5z" /></g></svg>);