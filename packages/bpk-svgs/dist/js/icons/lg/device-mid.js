import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style={{
  width: "1.5rem",
  height: "1.5rem"
}} {...props}><path d="M19.75 3.999H4.25A2.25 2.25 0 0 0 2 6.249v11.502a2.25 2.25 0 0 0 2.25 2.25h15.5a2.25 2.25 0 0 0 2.25-2.25V6.249a2.25 2.25 0 0 0-2.25-2.25zm-6 13h-3.5a.75.75 0 0 1 0-1.5h3.5a.75.75 0 0 1 0 1.5z" /></svg>);