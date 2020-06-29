import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" style={{
  width: "1.125rem",
  height: "1.125rem"
}} {...props}><path d="M12 8.25c0-.414.338-.757.747-.688a4.501 4.501 0 1 1-3.357 8.104c-.337-.24-.335-.722-.042-1.014l2.432-2.432a.75.75 0 0 0 .22-.53V8.25z" /><path fillRule="evenodd" d="M22.5 12c0 5.799-4.701 10.5-10.5 10.5S1.5 17.799 1.5 12 6.201 1.5 12 1.5 22.5 6.201 22.5 12zm-3 0a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0z" clipRule="evenodd" /></svg>);