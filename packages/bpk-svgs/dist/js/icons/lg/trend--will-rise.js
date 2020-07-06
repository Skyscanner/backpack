import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style={{
  width: "1.5rem",
  height: "1.5rem"
}} {...props}><path fillRule="evenodd" d="M21 5a1 1 0 0 1 1 1v7.018c0 .553-.45 1.001-1.004 1.001a1.003 1.003 0 0 1-1.004-1V8.437l-7.902 7.967c-.377.38-.892.595-1.428.595H3.004a1.003 1.003 0 0 1-1.004-1c0-.553.45-1.001 1.004-1.001h7.658l7.929-7.996h-4.54C13.496 7.002 13 6.552 13 6c0-.553.496-1 1.05-1H21z" clipRule="evenodd" /></svg>);