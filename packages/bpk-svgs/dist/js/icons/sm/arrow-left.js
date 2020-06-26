import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" style={{
  width: "1.125rem",
  height: "1.125rem"
}} {...props}><path d="M15 16.537V7.463c0-1.246-1.365-1.92-2.251-1.11l-4.77 4.354c-.622.568-.641 1.59-.04 2.184l4.77 4.718c.873.865 2.291.201 2.291-1.072z" /></svg>);