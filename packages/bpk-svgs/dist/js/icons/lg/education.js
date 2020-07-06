import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style={{
  width: "1.5rem",
  height: "1.5rem"
}} {...props}><path d="M2.61 7.09l7.796-4.644a3.073 3.073 0 0 1 3.188 0L21.39 7.09c.407.243.61.692.61 1.141V15a1 1 0 1 1-2 0v-3.301a1 1 0 0 0-1.485-.875l-5.05 2.803a3.066 3.066 0 0 1-2.93 0L2.652 9.401c-.85-.456-.876-1.815-.043-2.31z" /><path d="M17.288 13.834a.5.5 0 0 1 .712.453v4.595a1 1 0 0 1-.553.894l-3.658 1.83a4 4 0 0 1-3.578 0l-5.658-2.712A1 1 0 0 1 4 18v-5a.5.5 0 0 1 .736-.44l5.798 3.067a3.066 3.066 0 0 0 2.931 0l3.823-1.793z" /></svg>);