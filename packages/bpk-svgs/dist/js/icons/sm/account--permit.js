import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" style={{
  width: "1rem",
  height: "1rem"
}} {...props}><path d="M18 2H6a2 2 0 0 0-2 2v18l8-4 8 4V4a2 2 0 0 0-2-2zm-7.515 12.929l-3.707-3.861L8.22 9.683l2.293 2.389 5.278-5.278 1.414 1.414-6.72 6.721z" /></svg>);