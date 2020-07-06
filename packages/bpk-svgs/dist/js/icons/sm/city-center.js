import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" style={{
  width: "1.125rem",
  height: "1.125rem"
}} {...props}><path fillRule="evenodd" d="M22.5 9.83v-.076C22.5 4.367 17.799 0 12 0S1.5 4.367 1.5 9.754v.075a9.27 9.27 0 0 0 1.816 5.41c1.982 3.206 5.278 6.337 7.84 8.461.481.4 1.207.4 1.689 0 2.56-2.123 5.857-5.255 7.839-8.46A9.27 9.27 0 0 0 22.5 9.83zM12 15a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9z" clipRule="evenodd" /></svg>);