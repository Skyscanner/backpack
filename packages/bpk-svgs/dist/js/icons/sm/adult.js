import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" style={{
  width: "1rem",
  height: "1rem"
}} {...props}><path d="M12 6c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-3 8.5c0 .3.2.5.5.5h.5l1 7h2l1-7h.5c.3 0 .5-.2.5-.5l.7-5.2c.2-1.2-.8-2.3-2-2.3h-3.4c-1.2 0-2.1 1.1-2 2.3l.7 5.2z" /></svg>);