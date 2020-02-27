import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" style={{
  width: "1rem",
  height: "1rem"
}} {...props}><path d="M12 3.004a.484.484 0 0 0-.406.24l-2.881 4.83-5.337 1.394a.528.528 0 0 0-.26.838L6.61 14.67l-.383 5.748a.5.5 0 0 0 .68.518L12 17.756z" /></svg>);