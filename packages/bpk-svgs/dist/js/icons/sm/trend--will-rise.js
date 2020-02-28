import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" style={{
  width: "1rem",
  height: "1rem"
}} {...props}><path d="M20.62 5.353l-5.864 1.571a.872.872 0 0 0-.39 1.459l1.068 1.068-3.2 3.355-8.725.023a1.5 1.5 0 0 0 .004 3h.004l9.366-.025a1.499 1.499 0 0 0 1.081-.465l3.591-3.766 1.103 1.103a.872.872 0 0 0 1.459-.391l1.57-5.864a.872.872 0 0 0-1.067-1.068z" /></svg>);