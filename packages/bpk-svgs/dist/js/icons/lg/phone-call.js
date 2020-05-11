import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style={{
  width: "1.5rem",
  height: "1.5rem"
}} {...props}><path d="M8.869 5.8s.985 1.353.115 2.229c-.574.577-1.358 1.953-.953 2.54.405.587 5.4 5.4 5.4 5.4s.572.5.953.317 2.222-1.27 2.222-1.27a1.887 1.887 0 011.588.318c.835.58 3.407 2.285 3.407 2.285.402.488.486 1.164.218 1.736a22.076 22.076 0 01-2.119 2.423c-.656.3-1.403.333-2.082.09-1.444-.343-4.818-1.148-9.446-5.768A28.538 28.538 0 012.013 6.065a2.974 2.974 0 01.473-1.9C3.1 3.277 4.9.994 6.257 2.5a38.2 38.2 0 012.612 3.3z" /></svg>);