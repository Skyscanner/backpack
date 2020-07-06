import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style={{
  width: "1.5rem",
  height: "1.5rem"
}} {...props}><path fillRule="evenodd" d="M1 7a3 3 0 0 1 3-3h16a3 3 0 0 1 3 3v2.5c0 .276-.227.494-.495.562a2 2 0 0 0 0 3.876c.268.068.495.286.495.562V17a3 3 0 0 1-3 3H4a3 3 0 0 1-3-3v-2.5c0-.276.227-.494.495-.562a2 2 0 0 0 0-3.876C1.227 9.994 1 9.776 1 9.5V7zm11 8.945V9.67l-1.383 1.144a.965.965 0 0 1-1.404-.179 1.095 1.095 0 0 1 .17-1.482l2.191-1.814C12.56 6.526 14 7.266 14 8.586v7.359c0 .582-.448 1.055-1 1.055s-1-.473-1-1.055z" clipRule="evenodd" /></svg>);