import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style={{
  width: "1.5rem",
  height: "1.5rem"
}} {...props}><path fillRule="evenodd" d="M5 4h14c1.5 0 3 1.5 3 3v9c0 1.5-1.5 3-3 3H5c-1.5 0-3-1.5-3-3V7c0-1.5 1.5-3 3-3zm5.647 10.932l4.138-3.008c.287-.191.287-.671 0-.862l-4.138-2.995c-.288-.191-.647.05-.647.432V14.5c0 .384.36.623.647.431z" clipRule="evenodd" /><path d="M7 22a1 1 0 1 1 0-2h10a1 1 0 1 1 0 2H7z" /></svg>);