import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style={{
  width: "1.5rem",
  height: "1.5rem"
}} {...props}><path fillRule="evenodd" d="M12.386 2.996a2.608 2.608 0 0 1 2.608 2.609v3.191a1.5 1.5 0 0 1-.439 1.06l-4.92 4.922a1.5 1.5 0 0 1-2.122 0l-4.3-4.3a1.5 1.5 0 0 1 0-2.121l4.921-4.921a1.5 1.5 0 0 1 1.06-.44zm-.983 3.593a1 1 0 1 1 1.413-1.414 1 1 0 0 1-1.413 1.414z" /></svg>);