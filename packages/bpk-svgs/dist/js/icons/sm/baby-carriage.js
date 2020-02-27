import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" style={{
  width: "1rem",
  height: "1rem"
}} {...props}><path d="M10.5 19.5c0 1.4-1.1 2.5-2.5 2.5s-2.5-1.1-2.5-2.5S6.7 17 8 17s2.5 1.1 2.5 2.5zM16 17c-1.4 0-2.5 1.1-2.5 2.5S14.7 22 16 22s2.5-1.1 2.5-2.5S17.4 17 16 17zm-6-7V2c-4.4 0-8 3.6-8 8h8zm12 1H2c0 2.8 2.2 5 5 5h10c2.8 0 5-2.2 5-5z" /></svg>);