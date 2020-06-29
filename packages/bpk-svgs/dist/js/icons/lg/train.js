import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style={{
  width: "1.5rem",
  height: "1.5rem"
}} {...props}><path fillRule="evenodd" d="M4 4h9.318a3 3 0 0 1 2.046.807l5.048 4.71A5 5 0 0 1 22 13.173V17c0 1.657-.343 3-2 3h-1.875A1.125 1.125 0 0 1 17 18.875C17 17.84 16.16 17 15.125 17H3a1 1 0 0 1-1-1V6a2 2 0 0 1 2-2zm8 2a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h4.586c.89 0 1.337-1.077.707-1.707l-3-3A1 1 0 0 0 13.586 6H12zM4 7a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7z" clipRule="evenodd" /><path d="M2 19a1 1 0 0 1 1-1h12a1 1 0 1 1 0 2H3a1 1 0 0 1-1-1z" /></svg>);