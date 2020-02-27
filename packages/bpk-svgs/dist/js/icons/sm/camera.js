import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" style={{
  width: "1rem",
  height: "1rem"
}} {...props}><path d="M20 7h-2l-2.3-2.2c-.5-.5-1.3-.8-2-.8h-3.4c-.7 0-1.5.3-2 .8L6 7H4c-1.1 0-2 .9-2 2v9c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zm-10-.5c0-.3.2-.5.5-.5h3c.3 0 .5.2.5.5s-.2.5-.5.5h-3c-.3 0-.5-.2-.5-.5zm2 11c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4zm0-6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2z" /></svg>);