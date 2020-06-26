import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" style={{
  width: "1.125rem",
  height: "1.125rem"
}} {...props}><path fillRule="evenodd" d="M12 1.5C6.225 1.5 1.5 6.225 1.5 12S6.225 22.5 12 22.5 22.5 17.775 22.5 12 17.775 1.5 12 1.5zm5.526 8.63a1.536 1.536 0 0 0 .068-2.15 1.486 1.486 0 0 0-2.12-.069l-4.376 4.234L8.62 9.531a1.486 1.486 0 0 0-2.118-.126 1.535 1.535 0 0 0-.124 2.147l4.523 4.948 6.624-6.37z" clipRule="evenodd" /></svg>);