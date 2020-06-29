import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style={{
  width: "1.5rem",
  height: "1.5rem"
}} {...props}><path fillRule="evenodd" d="M12.335 13.749a6.5 6.5 0 1 1 1.414-1.414l7.958 7.958a1 1 0 0 1-1.414 1.414l-1.53-1.529-1.574 1.547a1 1 0 0 1-1.378-1.45l1.538-1.512-.849-.849-2.293 2.293a1 1 0 0 1-1.414-1.414l2.293-2.293-2.751-2.751zM13 8.5a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0z" clipRule="evenodd" /></svg>);