import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style={{
  width: "1.5rem",
  height: "1.5rem"
}} {...props}><path d="M4 2.98c0-.283.123-.554.382-.668A4.082 4.082 0 0 1 6 2c.702 0 1.239.155 1.595.311C7.86 2.43 8 2.708 8 3v2.514C8 6.5 7 7 6 7s-2-.5-2-1.486V2.98zM7.164 22C8 22 9 21 9 20l.68-6.944a1 1 0 0 1 .811-.898l10.693-2.005A1 1 0 0 0 22 9.17V9a1 1 0 0 0-1-1H6c-.911.005-2.44.203-3.453.55C2.2 8.67 2 9.013 2 9.38V20c0 1 1 2 2 2h3.164zM21 7c.552 0 1.014-.458.848-.984C21.299 4.282 19.337 3 17 3c-2.337 0-4.3 1.282-4.848 3.016-.166.526.296.984.848.984h8z" /></svg>);