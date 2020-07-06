import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style={{
  width: "1.5rem",
  height: "1.5rem"
}} {...props}><path d="M7 11.896V20a1 1 0 0 0 1 1h6.035a5 5 0 0 0 4.682-3.244l2.27-6.054A2 2 0 0 0 19.114 9h-4.833a1 1 0 0 1-.97-1.243l.297-1.188A2.873 2.873 0 0 0 10.82 3a.479.479 0 0 0-.443.296L7.15 11.134a2 2 0 0 0-.151.762zM5 12.5a1.5 1.5 0 0 0-3 0v7a1.5 1.5 0 0 0 3 0v-7z" /></svg>);