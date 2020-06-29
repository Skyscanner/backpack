import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" style={{
  width: "1.125rem",
  height: "1.125rem"
}} {...props}><path d="M1.55 5.448c-.055.3.135.581.417.7l9.742 4.102a.75.75 0 0 0 .582 0l9.742-4.102c.282-.119.472-.4.416-.7A3 3 0 0 0 19.5 3h-15a3.001 3.001 0 0 0-2.95 2.448z" /><path d="M22.5 8.836a.75.75 0 0 0-1.041-.691l-8.877 3.738a1.5 1.5 0 0 1-1.164 0L2.54 8.145a.75.75 0 0 0-1.041.691V18a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.836z" /></svg>);