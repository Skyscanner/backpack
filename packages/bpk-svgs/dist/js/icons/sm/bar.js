import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" style={{
  width: "1.125rem",
  height: "1.125rem"
}} {...props}><path fillRule="evenodd" d="M3.13 5.657c-.346-.499.039-1.157.678-1.157h16.384c.64 0 1.024.658.677 1.157l-6.6 9.169a4.238 4.238 0 0 0-.019 4.86l3.411 3.161c.342.5-.044 1.153-.68 1.153H7.019c-.636 0-1.022-.653-.68-1.153l3.411-3.16a4.238 4.238 0 0 0-.02-4.861l-6.6-9.169zM14.25 10.5a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5z" clipRule="evenodd" /></svg>);