import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" style={{
  width: "1.125rem",
  height: "1.125rem"
}} {...props}><path fillRule="evenodd" d="M1.5 12C1.5 6.201 6.201 1.5 12 1.5S22.5 6.201 22.5 12 17.799 22.5 12 22.5 1.5 17.799 1.5 12zm9-5.25a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 .75.75V9a1.5 1.5 0 0 1-3 0V6.75zm6 7.539c0 .273-.07.543-.23.765A5.243 5.243 0 0 1 12 17.25a5.243 5.243 0 0 1-4.27-2.196 1.306 1.306 0 0 1-.23-.765v-.675a.71.71 0 0 1 .513-.67l2.09-.654a6.361 6.361 0 0 1 3.794 0l2.09.655a.71.71 0 0 1 .513.669v.675z" clipRule="evenodd" /></svg>);