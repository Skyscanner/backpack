import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style={{
  width: "1.5rem",
  height: "1.5rem"
}} {...props}><path fillRule="evenodd" d="M12 5a7.003 7.003 0 0 0-6.492 4.375 1 1 0 1 1-1.853-.75A9.003 9.003 0 0 1 19 6.343V4a1 1 0 1 1 2 0v5a1 1 0 0 1-1 1h-.558a.87.87 0 0 1-.046 0H15a1 1 0 1 1 0-2h2.746A6.993 6.993 0 0 0 12 5zM6.254 16H9a1 1 0 1 0 0-2H4a1 1 0 0 0-1 1v5a1 1 0 1 0 2 0v-2.343a9.002 9.002 0 0 0 15.345-2.282 1 1 0 1 0-1.853-.75A7.003 7.003 0 0 1 6.254 16z" clipRule="evenodd" /></svg>);