import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" style={{
  width: "1rem",
  height: "1rem"
}} {...props}><path d="M12 2c1.7 0 3 1.3 3 3v7c0 1.7-1.3 3-3 3s-3-1.3-3-3V5c0-1.7 1.3-3 3-3zm5 6v4.3c-.1 2.7-2.3 4.8-5 4.7-2.7.1-4.9-2-5-4.7V8H5v4.3c.1 3.4 2.6 6.2 6 6.6V20h-1c-1.1 0-2 .9-2 2h8c0-1.1-.9-2-2-2h-1v-1.1c3.4-.4 5.9-3.2 6-6.6V8h-2z" /></svg>);