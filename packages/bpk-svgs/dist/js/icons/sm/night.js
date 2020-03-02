import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" style={{
  width: "1rem",
  height: "1rem"
}} {...props}><path d="M15.1 14.9c-3-.5-5.5-3-6-6-.4-2.5.3-4.7 1.8-6.4.1-.2 0-.4-.2-.4-5.1.7-8.9 5.1-8.7 10.4.2 5.1 4.4 9.3 9.5 9.5 5.3.2 9.7-3.6 10.4-8.7 0-.2-.2-.4-.4-.2-1.6 1.4-3.9 2.2-6.4 1.8z" /></svg>);