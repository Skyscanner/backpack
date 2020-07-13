import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style={{
  width: "1.5rem",
  height: "1.5rem"
}} {...props}><path d="M4 2a3 3 0 0 0-3 3v1.5a.615.615 0 0 0 .495.562 2 2 0 0 1 0 3.876A.615.615 0 0 0 1 11.5V13a3 3 0 0 0 3 3h16a3 3 0 0 0 3-3v-1.5a.615.615 0 0 0-.495-.562 2 2 0 0 1 0-3.876A.615.615 0 0 0 23 6.5V5a3 3 0 0 0-3-3zM3 18a1 1 0 0 1 1-1h16a1 1 0 0 1 0 2H4a1 1 0 0 1-1-1zm3 2a1 1 0 0 0 0 2h12a1 1 0 0 0 0-2z" /></svg>);