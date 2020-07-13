import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" style={{
  width: "1.125rem",
  height: "1.125rem"
}} {...props}><path fillRule="evenodd" d="M3 3.75a3 3 0 0 1 3-3h9a3 3 0 0 1 3 3v1.5a4.5 4.5 0 0 1 0 9v1.5a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3zm16.5 6a1.5 1.5 0 0 1-1.5 1.5v-3a1.5 1.5 0 0 1 1.5 1.5zM8.56 5.69a1.5 1.5 0 0 0-2.195 2.045q.036.039.075.075l1.939 1.94-1.94 1.94a1.5 1.5 0 0 0 2.122 2.12l1.939-1.939 1.94 1.94a1.5 1.5 0 0 0 2.12-2.122L12.622 9.75l1.94-1.94a1.5 1.5 0 0 0-2.122-2.12L10.5 7.628l-1.94-1.94z" /><path d="M3 20.25a1.5 1.5 0 0 0 0 3h15a1.5 1.5 0 0 0 0-3z" /></svg>);