import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style={{
  width: "1.5rem",
  height: "1.5rem"
}} {...props}><path fillRule="evenodd" d="M19 10.5a8.5 8.5 0 1 0-17 0 8.5 8.5 0 0 0 17 0zm-15 0C4 6.917 6.917 4 10.5 4S17 6.917 17 10.5 14.083 17 10.5 17A6.508 6.508 0 0 1 4 10.5z" clipRule="evenodd" /><path d="M18.558 16.415c-.14-.14-.733.227-1.324.818-.591.592-.958 1.184-.818 1.324l2.998 3a1.514 1.514 0 1 0 2.142-2.143l-2.998-2.999z" /></svg>);