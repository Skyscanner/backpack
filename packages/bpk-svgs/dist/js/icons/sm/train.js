import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" style={{
  width: "1.125rem",
  height: "1.125rem"
}} {...props}><path fillRule="evenodd" d="M1.5 15A1.5 1.5 0 0 0 3 16.5h10.5a3 3 0 0 1 3 3A1.5 1.5 0 0 0 18 21h3a1.5 1.5 0 0 0 1.5-1.5v-6.414a3 3 0 0 0-.695-1.92L15.45 3.54A1.5 1.5 0 0 0 14.297 3H3a1.5 1.5 0 0 0-1.5 1.5V15zm3.75-9a.75.75 0 0 0-.75.75v3c0 .414.336.75.75.75h3A.75.75 0 0 0 9 9.75v-3A.75.75 0 0 0 8.25 6h-3zm6.75.75a.75.75 0 0 1 .75-.75h.399a.75.75 0 0 1 .576.27l2.5 3a.75.75 0 0 1-.576 1.23H12.75a.75.75 0 0 1-.75-.75v-3z" clipRule="evenodd" /><path d="M3 18a1.5 1.5 0 0 0 0 3h10.5a1.5 1.5 0 0 0 0-3H3z" /></svg>);