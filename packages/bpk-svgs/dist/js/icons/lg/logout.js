import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style={{
  width: "1.5rem",
  height: "1.5rem"
}} {...props}><path d="M15.293 17.707a1 1 0 0 0 1.414 0l5-5a1 1 0 0 0 0-1.414l-5-5a1 1 0 1 0-1.414 1.414L18.586 11H9.997a1 1 0 1 0 0 2h8.589l-3.293 3.293a1 1 0 0 0 0 1.414z" /><path d="M9 5a1 1 0 1 0 0-2H6a4 4 0 0 0-4 4v10a4 4 0 0 0 4 4h3a1 1 0 1 0 0-2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h3z" /></svg>);