import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" style={{
  width: "1.125rem",
  height: "1.125rem"
}} {...props}><path fillRule="evenodd" d="M20.39 2.836A3 3 0 0 0 17.895 1.5H6.106a3 3 0 0 0-2.497 1.336L2.004 5.244A3 3 0 0 0 1.5 6.908V19.5a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V6.908a3 3 0 0 0-.504-1.664l-1.605-2.408zM5.586 5.329A1.5 1.5 0 0 1 6.927 4.5h10.146a1.5 1.5 0 0 1 1.342.83l.542 1.085a.75.75 0 0 1-.67 1.085H5.713a.75.75 0 0 1-.671-1.085l.542-1.086zM9 12a1.5 1.5 0 0 0-3 0 6 6 0 0 0 12 0 1.5 1.5 0 0 0-3 0 3 3 0 1 1-6 0z" clipRule="evenodd" /></svg>);