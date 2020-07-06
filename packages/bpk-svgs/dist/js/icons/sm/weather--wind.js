import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" style={{
  width: "1.125rem",
  height: "1.125rem"
}} {...props}><path d="M10.5 3a3 3 0 0 0-3 3 1.5 1.5 0 1 1-3 0 6 6 0 1 1 6 6h-9a1.5 1.5 0 0 1 0-3h9a3 3 0 1 0 0-6z" /><path d="M13.5 21a1.5 1.5 0 0 1-1.397-.95 1.5 1.5 0 0 0-2.791 1.098A4.501 4.501 0 0 0 17.744 18H19.5a4.5 4.5 0 1 0-4.188-6.148 1.5 1.5 0 0 0 2.791 1.099A1.5 1.5 0 1 1 19.5 15h-18a1.5 1.5 0 0 0 0 3h12a1.5 1.5 0 0 1 0 3z" /></svg>);