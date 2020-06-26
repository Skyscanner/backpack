import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style={{
  width: "1.5rem",
  height: "1.5rem"
}} {...props}><path fillRule="evenodd" d="M16.75 4a2.25 2.25 0 0 1 2.245 2.096L19 6.25V17.5a.5.5 0 0 0 .992.09L20 17.5V7.572c0-.298.264-.533.542-.429a2.251 2.251 0 0 1 1.452 1.943L22 9.25v7.5a3.25 3.25 0 0 1-3.066 3.245L18.75 20H5.25a3.25 3.25 0 0 1-3.245-3.066L2 16.75V6.25a2.25 2.25 0 0 1 2.096-2.245L4.25 4h12.5zM5 8a1 1 0 0 1 1-1h9a1 1 0 1 1 0 2H6a1 1 0 0 1-1-1zm8 3a1 1 0 1 0 0 2h2a1 1 0 1 0 0-2h-2zm-8 1a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-4zm8 3a1 1 0 1 0 0 2h2a1 1 0 1 0 0-2h-2z" clipRule="evenodd" /></svg>);