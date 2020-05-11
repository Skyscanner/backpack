import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" style={{
  width: "1.125rem",
  height: "1.125rem"
}} {...props}><path d="M13.83 3.12a.5.5 0 00-.83.38v3.84a13.18 13.18 0 00-5.1 1.89 10.49 10.49 0 00-3.39 3.62A13 13 0 003.13 17 15.38 15.38 0 003 21v-.14a12.66 12.66 0 011-2.47 11 11 0 013.58-3.76 10.57 10.57 0 012.82-1.33 22.69 22.69 0 012.6-.64v3.84a.5.5 0 00.84.37L21 10z" /></svg>);