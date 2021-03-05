import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" style={{
  width: "1.125rem",
  height: "1.125rem"
}} {...props}><path d="M9 7.5A1.5 1.5 0 0 0 10.5 9h6.879l-1.94 1.94a1.5 1.5 0 0 0 2.122 2.12l4.5-4.5a1.5 1.5 0 0 0 0-2.12l-4.5-4.5a1.5 1.5 0 1 0-2.122 2.12L17.38 6H10.5A1.5 1.5 0 0 0 9 7.5zm6 9a1.5 1.5 0 0 0-1.5-1.5H6.62l1.94-1.94a1.5 1.5 0 0 0-2.122-2.12l-4.5 4.5a1.5 1.5 0 0 0 0 2.12l4.5 4.5a1.5 1.5 0 0 0 2.122-2.12L6.62 18h6.88a1.5 1.5 0 0 0 1.5-1.5z" clipRule="evenodd" /></svg>);