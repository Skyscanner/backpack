import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" style={{
  width: "1rem",
  height: "1rem"
}} {...props}><path d="M20 5H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zm-7 12H4V7h9v10zm7-6h-5v-1h5v1zm0-2h-5V8h5v1zm-7.5 7h-8c.201-1.29.8-2.251 1.535-2.463l1.291-.372a4.24 4.24 0 0 1 2.348 0l1.291.372c.734.212 1.334 1.173 1.535 2.463zm-6-6a2 2 0 1 1 3.999-.001A2 2 0 0 1 6.5 10z" /></svg>);