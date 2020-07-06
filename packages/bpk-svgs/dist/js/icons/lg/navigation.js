import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style={{
  width: "1.5rem",
  height: "1.5rem"
}} {...props}><path fillRule="evenodd" d="M12 22c5.5 0 10-4.5 10-10S17.5 2 12 2 2 6.5 2 12s4.5 10 10 10zM10.449 9.184l5.602-1.868a.5.5 0 0 1 .633.633l-1.868 5.602a2 2 0 0 1-1.265 1.265L7.95 16.684a.5.5 0 0 1-.633-.633l1.868-5.602a2 2 0 0 1 1.265-1.265zM12.7 11.3c.2.2.3.4.3.7 0 .3-.1.5-.3.7-.2.2-.4.3-.7.3-.3 0-.5-.1-.7-.3-.2-.2-.3-.4-.3-.7 0-.3.1-.5.3-.7.2-.2.4-.3.7-.3.3 0 .5.1.7.3z" clipRule="evenodd" /></svg>);