import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style={{
  width: "1.5rem",
  height: "1.5rem"
}} {...props}><path d="M3.208 19.382C2.71 20.038 3.16 21 3.966 21h11.55c.89 0 1.663-.63 1.873-1.526l3.583-15.237C21.12 3.607 20.66 3 20.035 3H18.32c-1.707 0-3.323.822-4.394 2.236L3.208 19.382z" /></svg>);