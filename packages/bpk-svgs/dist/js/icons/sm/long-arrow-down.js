import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" style={{
  width: "1.125rem",
  height: "1.125rem"
}} {...props}><path fillRule="evenodd" d="M12 2.69a1.5 1.5 0 0 0-1.5 1.5v11.379l-4.94-4.94a1.5 1.5 0 0 0-2.12 2.122L12 21.31l8.56-8.56a1.5 1.5 0 0 0-2.12-2.122l-4.94 4.94V4.19a1.5 1.5 0 0 0-1.5-1.5z" /></svg>);