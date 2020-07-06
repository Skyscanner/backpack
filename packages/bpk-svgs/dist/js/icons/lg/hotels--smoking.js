import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style={{
  width: "1.5rem",
  height: "1.5rem"
}} {...props}><path d="M16.224 8.429H12.11C9.825 8.429 8 6.885 8 4.952V2.58c0-.321.307-.58.685-.58.379 0 .588.259.588.58v2.372c0 1.295 1.307 2.19 2.838 2.19h1.82a3.314 3.314 0 0 1-.84-2.2V2.579c0-.32.291-.578.65-.578.36 0 .623.259.623.578v2.365c0 1.29 1.11 2.2 2.561 2.2h1.542c1.949 0 3.533 1.548 3.533 3.28 0 .318-.291.577-.65.577-.359 0-.65-.259-.65-.578 0-1.094-1.002-1.985-2.233-1.985h-1.542a4.39 4.39 0 0 1-.516-.03.804.804 0 0 1-.185.022z" /><path fillRule="evenodd" d="M5 19a3 3 0 1 1 0-6h15c1 0 2 1 2 2v2c0 1-1 2-2 2H5zm15-3a1 1 0 0 1-1 1h-5a1 1 0 1 1 0-2h5a1 1 0 0 1 1 1z" clipRule="evenodd" /></svg>);