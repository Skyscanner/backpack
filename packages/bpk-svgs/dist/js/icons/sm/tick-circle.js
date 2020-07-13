import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" style={{
  width: "1.125rem",
  height: "1.125rem"
}} {...props}><path d="M12 1.5A10.5 10.5 0 1 0 22.5 12 10.53 10.53 0 0 0 12 1.5zm5.526 8.63h-.001l-6.624 6.37-4.523-4.948a1.535 1.535 0 0 1 .124-2.147l.021-.019a1.486 1.486 0 0 1 2.097.145l2.478 2.614 4.376-4.234.02-.019a1.486 1.486 0 0 1 2.1.088 1.536 1.536 0 0 1-.068 2.15z" /></svg>);