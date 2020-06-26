import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" style={{
  width: "1.125rem",
  height: "1.125rem"
}} {...props}><path d="M10.338 6.099l7.561 7.561-5.848 5.849a3.363 3.363 0 0 1-1.493.866l-7.643 2.084a1.12 1.12 0 0 1-1.376-1.376l2.085-7.643a3.361 3.361 0 0 1 .866-1.492l5.848-5.85zm10.595-3.033a5.347 5.347 0 0 1 0 7.561l-1.45 1.448-7.561-7.56 1.45-1.45a5.346 5.346 0 0 1 7.56 0z" /></svg>);