import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style={{
  width: "1.5rem",
  height: "1.5rem"
}} {...props}><path d="M16.116 12.104V4a1 1 0 0 0-1-1H9.08a5 5 0 0 0-4.682 3.244l-2.27 6.054A2 2 0 0 0 4.002 15h4.833a1 1 0 0 1 .97 1.242l-.297 1.188A2.873 2.873 0 0 0 12.295 21a.479.479 0 0 0 .443-.297l3.227-7.837a2 2 0 0 0 .15-.762zm2-.604a1.5 1.5 0 0 0 3 0v-7a1.5 1.5 0 0 0-3 0v7z" /></svg>);