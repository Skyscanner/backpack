import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" style={{
  width: "1rem",
  height: "1rem"
}} {...props}><path d="M10 12h4v8a2 2 0 1 1-4 0v-8zm9-4v2a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h4V4a2 2 0 1 1 4 0v3h4a1 1 0 0 1 1 1zm-1 0H6v1h12V8zm0-3h-2v1h2V5zm-2 9h2v-1h-2v1zm0 3h2v-1h-2v1zm0 3h2v-1h-2v1z" /></svg>);