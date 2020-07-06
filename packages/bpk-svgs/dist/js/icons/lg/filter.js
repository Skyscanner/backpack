import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style={{
  width: "1.5rem",
  height: "1.5rem"
}} {...props}><path d="M7 6a1 1 0 0 1 2 0v4a1 1 0 1 1-2 0v-.5a.5.5 0 0 0-.5-.5H3a1 1 0 1 1 0-2h3.5a.5.5 0 0 0 .5-.5V6zM3 17h8.481c.327 0 .565-.31.535-.635a4.08 4.08 0 0 1 0-.73c.03-.325-.208-.635-.535-.635H3a1 1 0 1 0 0 2zm14.5 0a.5.5 0 0 0-.5.5v.5a1 1 0 1 1-2 0v-4a1 1 0 1 1 2 0v.5a.5.5 0 0 0 .5.5H21a1 1 0 1 1 0 2h-3.5zM11 8a1 1 0 0 1 1-1h9a1 1 0 1 1 0 2h-9a1 1 0 0 1-1-1z" /><path d="M2 16a1 1 0 0 1 1-1h9a1 1 0 1 1 0 2H3a1 1 0 0 1-1-1z" /></svg>);