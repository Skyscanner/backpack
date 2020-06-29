import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style={{
  width: "1.5rem",
  height: "1.5rem"
}} {...props}><path d="M12 22C6.477 22 2 17.522 2 12S6.477 2 12 2s10 4.478 10 10-4.477 10-10 10zm-.002-13.004a.999.999 0 1 0 0-1.997.999.999 0 0 0 0 1.997zM12 17a1 1 0 0 0 .993-.884L13 16l-.002-5.001-.007-.117a1 1 0 0 0-1.986 0l-.007.117L11 16l.007.117A1 1 0 0 0 12 17z" /></svg>);