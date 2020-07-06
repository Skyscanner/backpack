import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" style={{
  width: "1.125rem",
  height: "1.125rem"
}} {...props}><path fillRule="evenodd" d="M22.5 4.5A1.5 1.5 0 0 1 24 6v7.527c0 .83-.674 1.502-1.506 1.502a1.504 1.504 0 0 1-1.507-1.502v-3.87l-8.852 8.951a3.017 3.017 0 0 1-2.143.892H1.506A1.504 1.504 0 0 1 0 17.998c0-.829.674-1.501 1.506-1.501h8.486l8.894-8.994h-3.81C14.244 7.503 13.5 6.83 13.5 6c0-.83.744-1.5 1.576-1.5H22.5z" clipRule="evenodd" /></svg>);