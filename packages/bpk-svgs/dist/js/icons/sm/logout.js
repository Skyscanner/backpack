import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" style={{
  width: "1.125rem",
  height: "1.125rem"
}} {...props}><path d="M10.19 10.5a1.5 1.5 0 1 0 0 3h6.878l-1.94 1.939a1.5 1.5 0 0 0 2.122 2.121L22.81 12l-5.56-5.561a1.5 1.5 0 1 0-2.158 2.084l.037.037 1.939 1.94H10.19z" /><path d="M9.44 4.5a1.5 1.5 0 0 0 0-3H5.69A4.5 4.5 0 0 0 1.19 6v12a4.5 4.5 0 0 0 4.5 4.5h3.75a1.5 1.5 0 0 0 0-3H5.69a1.5 1.5 0 0 1-1.5-1.5V6a1.5 1.5 0 0 1 1.5-1.5z" /></svg>);