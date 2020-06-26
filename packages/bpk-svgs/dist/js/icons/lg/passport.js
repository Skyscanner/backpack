import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style={{
  width: "1.5rem",
  height: "1.5rem"
}} {...props}><path fillRule="evenodd" d="M12 13a3.001 3.001 0 0 1 0-6 3.001 3.001 0 0 1 0 6zm-3 4a1 1 0 0 0 1 1h4a1 1 0 1 0 0-2h-4a1 1 0 0 0-1 1zm7.8-15H5a1 1 0 0 0-1 1v18a1 1 0 0 0 1 1h11.8c1.766 0 3.2-1.493 3.2-3.333V5.333C20 3.493 18.566 2 16.8 2z" clipRule="evenodd" /></svg>);