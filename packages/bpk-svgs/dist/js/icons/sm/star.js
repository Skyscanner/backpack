import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" style={{
  width: "1.125rem",
  height: "1.125rem"
}} {...props}><path d="M17.349 14.762l3.535-4.415a.528.528 0 0 0-.26-.838L15.35 8.131l-2.915-4.887a.484.484 0 0 0-.841 0l-2.881 4.83-5.337 1.394a.528.528 0 0 0-.26.839L6.61 14.67l-.383 5.748a.5.5 0 0 0 .68.518l5.04-3.172 5.1 3.198a.5.5 0 0 0 .68-.518z" /></svg>);