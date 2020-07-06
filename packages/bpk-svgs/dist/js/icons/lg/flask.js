import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style={{
  width: "1.5rem",
  height: "1.5rem"
}} {...props}><path fillRule="evenodd" d="M13.079 2c.596 0 1.08.448 1.08 1v3.217c0 .603.146 1.198.43 1.741l5.084 9.736c1.04 1.992-.527 4.306-2.916 4.306H7.243c-2.39 0-3.956-2.314-2.916-4.306L9.41 7.962c.283-.543.43-1.138.43-1.741V3c0-.552.484-1 1.08-1h2.16zm1.315 9.553a1 1 0 1 0-1.788.894l2 4a1 1 0 1 0 1.788-.894l-2-4z" clipRule="evenodd" /></svg>);