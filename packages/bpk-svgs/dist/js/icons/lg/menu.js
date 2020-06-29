import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style={{
  width: "1.5rem",
  height: "1.5rem"
}} {...props}><path fillRule="evenodd" d="M21 7H3c-.6 0-1-.4-1-1s.4-1 1-1h18c.6 0 1 .4 1 1s-.4 1-1 1zm-4 5c0-.6-.333-1-.833-1H2.833c-.5 0-.833.4-.833 1s.333 1 .833 1h13.334c.5 0 .833-.4.833-1zm3.889 5c.667 0 1.111.4 1.111 1s-.444 1-1.111 1H3.11C2.444 19 2 18.6 2 18s.444-1 1.111-1H20.89z" clipRule="evenodd" /></svg>);