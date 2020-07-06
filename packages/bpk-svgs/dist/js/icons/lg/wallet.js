import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style={{
  width: "1.5rem",
  height: "1.5rem"
}} {...props}><path d="M22 8.25a2.25 2.25 0 0 0-2.096-2.245L19.75 6H4.5a.5.5 0 0 1-.09-.992L4.5 5h9.928c.298 0 .533-.263.428-.542a2.251 2.251 0 0 0-1.942-1.452L12.75 3h-7.5a3.25 3.25 0 0 0-3.245 3.066L2 6.25v12.5a3.25 3.25 0 0 0 3.066 3.245L5.25 22h14.5a2.25 2.25 0 0 0 2.245-2.096L22 19.75V18h-5a3 3 0 0 1-3-3v-2a3 3 0 0 1 3-3h5V8.25z" /><path fillRule="evenodd" d="M15 13a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-2zm6 1a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" clipRule="evenodd" /></svg>);