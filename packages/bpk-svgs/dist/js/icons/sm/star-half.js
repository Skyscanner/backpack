import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" style={{
  width: "1.125rem",
  height: "1.125rem"
}} {...props}><path d="M12 3.004a.484.484 0 00-.406.24l-2.881 4.83-5.337 1.394a.528.528 0 00-.26.838L6.61 14.67l-.383 5.748a.5.5 0 00.68.518L12 17.756z" /></svg>);