import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" style={{
  width: "1rem",
  height: "1rem"
}} {...props}><path d="M18.2 3c-2-.7-4.1-1.1-6.2-1-6 0-8 2-8 2v8s0 6 8 10c2.7-1.2 5-3.2 6.6-5.7.2-.3.3-.5.4-.8.6-1.1.9-2.3 1-3.5V4c-.5-.4-1.1-.8-1.8-1zM12 19.7c-5.8-3.3-6-7.6-6-7.7V5.1c1.9-.8 3.9-1.2 6-1.1v15.7z" /></svg>);