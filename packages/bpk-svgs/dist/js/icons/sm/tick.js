import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" style={{
  width: "1.125rem",
  height: "1.125rem"
}} {...props}><path fillRule="evenodd" d="M22.06 4.94a1.5 1.5 0 0 1 0 2.12L9.687 19.437a1.5 1.5 0 0 1-2.122 0L1.94 13.81a1.5 1.5 0 0 1 2.122-2.122l4.564 4.565L19.939 4.939a1.5 1.5 0 0 1 2.122 0z" clipRule="evenodd" /></svg>);