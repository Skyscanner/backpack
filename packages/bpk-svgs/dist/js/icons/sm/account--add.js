import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" style={{
  width: "1rem",
  height: "1rem"
}} {...props}><path d="M5.5 7.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0zm4.849 5.5h-4.46C3.711 13 2 14.629 2 16.704V19h9.537A5.968 5.968 0 0 1 10 15c0-.703.127-1.374.349-2zM22 15a5 5 0 1 1-10.001-.001A5 5 0 0 1 22 15zm-2-1h-2v-2h-2v2h-2v1.999h2v2h2v-2h2V14z" /></svg>);