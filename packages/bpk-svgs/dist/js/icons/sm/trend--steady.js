import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" style={{
  width: "1.125rem",
  height: "1.125rem"
}} {...props}><path fillRule="evenodd" d="M2.69 12a1.5 1.5 0 0 0 1.5 1.5h11.379l-3.44 3.44a1.5 1.5 0 0 0 2.122 2.12L21.31 12l-7.06-7.06a1.5 1.5 0 0 0-2.122 2.12l3.44 3.44H4.19a1.5 1.5 0 0 0-1.5 1.5z" /></svg>);