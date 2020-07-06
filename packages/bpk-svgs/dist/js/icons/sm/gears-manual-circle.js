import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" style={{
  width: "1.125rem",
  height: "1.125rem"
}} {...props}><path fillRule="evenodd" d="M12 22.5c5.799 0 10.5-4.701 10.5-10.5S17.799 1.5 12 1.5 1.5 6.201 1.5 12 6.201 22.5 12 22.5zM9 6a1.5 1.5 0 0 0-1.5 1.5v9a1.5 1.5 0 0 0 3 0v-3H15a1.5 1.5 0 0 0 1.5-1.5V7.5a1.5 1.5 0 0 0-3 0v3h-3v-3A1.5 1.5 0 0 0 9 6z" clipRule="evenodd" /></svg>);