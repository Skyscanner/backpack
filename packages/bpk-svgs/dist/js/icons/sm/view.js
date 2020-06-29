import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" style={{
  width: "1.125rem",
  height: "1.125rem"
}} {...props}><path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" /><path fillRule="evenodd" d="M.654 14.325c-.872-1.367-.872-3.28 0-4.647C3.237 5.626 7.354 3 12 3s8.763 2.626 11.346 6.678c.872 1.367.872 3.28 0 4.647C20.763 18.375 16.646 21 12 21S3.237 18.375.654 14.325zM18 12a6 6 0 1 1-12 0 6 6 0 0 1 12 0z" clipRule="evenodd" /></svg>);