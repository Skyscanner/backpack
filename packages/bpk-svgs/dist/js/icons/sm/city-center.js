import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" style={{
  width: "1rem",
  height: "1rem"
}} {...props}><path d="M12 6c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm6.1-7.2C16.6 3 14.4 2 12 2 9.7 2 7.5 3 5.9 4.8 3.1 8 3.5 12.6 6.5 16l4.8 5.7c.2.2.4.3.7.3.3 0 .5-.1.7-.3l4.8-5.7c3.1-3.4 3.4-8 .6-11.2zM12 16c-3.3 0-6-2.7-6-6s2.7-6 6-6 6 2.7 6 6-2.7 6-6 6z" /></svg>);