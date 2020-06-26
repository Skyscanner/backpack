import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" style={{
  width: "1.125rem",
  height: "1.125rem"
}} {...props}><path d="M7.5 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" /><path fillRule="evenodd" d="M19.5 1.5a3 3 0 0 1 3 3v15a3 3 0 0 1-3 3h-15a3 3 0 0 1-3-3v-15a3 3 0 0 1 3-3h15zm-2.14 12.677a1.5 1.5 0 0 0 2.14-1.357V6A1.5 1.5 0 0 0 18 4.5H6A1.5 1.5 0 0 0 4.5 6v6.82a1.5 1.5 0 0 0 2.14 1.357l3.868-1.823a3.5 3.5 0 0 1 2.985 0l3.867 1.823z" clipRule="evenodd" /></svg>);