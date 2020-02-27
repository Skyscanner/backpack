import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" style={{
  width: "1rem",
  height: "1rem"
}} {...props}><path d="M4 12V3H2v9a5 5 0 0 0 5 5h6v-2H7a3 3 0 0 1-3-3zm18.83 5.24a1.555 1.555 0 0 0-2.03-.63l-1.09.5-3.41-6.98a2.009 2.009 0 0 0-1.79-1.12L11 9V3H5v8a3 3 0 0 0 3 3h7l3.41 7 3.72-1.7a1.508 1.508 0 0 0 .701-2.06z" /></svg>);