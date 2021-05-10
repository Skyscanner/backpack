import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style={{
  width: "1.5rem",
  height: "1.5rem"
}} {...props}><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm5.237-12.324a1 1 0 0 0-1.474-1.352l-4.794 5.23-2.262-2.261a1 1 0 0 0-1.414 1.414l3 3a1 1 0 0 0 1.444-.031l5.5-6z" /></svg>);