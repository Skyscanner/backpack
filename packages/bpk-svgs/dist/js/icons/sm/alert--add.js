import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="null" height="null" style={{
  width: "3.5rem/3",
  height: "3.5rem/3"
}} {...props}><path d="M18 13.2c.2 2.3 2 1.7 2 4 0 1.7-3.5 3.8-8 3.8s-8-2.1-8-3.8c0-2.3 1.8-1.7 2-4 .5-5.5 1-7.7 4.4-8.9C11.6 3.8 11 3 12 3s.4.8 1.6 1.3c3.5 1.2 3.9 3.4 4.4 8.9zM12 20c3.9 0 6.5-1.7 6.5-2.1 0-.7-2-2-6.5-1.9-4.5 0-6.5 1.4-6.5 2 0 .3 2.6 2 6.5 2zm-2.5-2.8c.7-.1 1.6-.2 2.5-.2s1.8.1 2.5.2c-.6 1.2-1.4 1.8-2.5 1.8s-2-.6-2.5-1.8zM16 12v-2h-3V7h-2v3H8v2h3v3h2v-3h3z" /></svg>);