import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style={{
  width: "1.5rem",
  height: "1.5rem"
}} {...props}><path fillRule="evenodd" d="M19 10.5a8.5 8.5 0 1 0-8.5 8.5 8.5 8.5 0 0 0 8.5-8.5zm-15 0a6.5 6.5 0 1 1 6.5 6.5A6.509 6.509 0 0 1 4 10.5z" /><path d="M18.558 16.415c-.14-.14-.733.227-1.324.818-.591.592-.958 1.184-.818 1.324l2.998 3a1.515 1.515 0 1 0 2.142-2.143z" /></svg>);