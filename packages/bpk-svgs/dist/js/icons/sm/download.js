import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" style={{
  width: "1.125rem",
  height: "1.125rem"
}} {...props}><path d="M13.5 3a1.5 1.5 0 0 0-3 0v6.879l-1.94-1.94a1.5 1.5 0 1 0-2.12 2.122l4.5 4.5a1.5 1.5 0 0 0 2.12 0l4.5-4.5a1.5 1.5 0 0 0-2.12-2.122L13.5 9.88V3z" /><path d="M4.5 14.25a1.5 1.5 0 0 0-3 0V18A4.5 4.5 0 0 0 6 22.5h12a4.5 4.5 0 0 0 4.5-4.5v-3.75a1.5 1.5 0 0 0-3 0V18a1.5 1.5 0 0 1-1.5 1.5H6A1.5 1.5 0 0 1 4.5 18v-3.75z" /></svg>);