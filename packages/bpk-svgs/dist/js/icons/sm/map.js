import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" style={{
  width: "1.125rem",
  height: "1.125rem"
}} {...props}><path fillRule="evenodd" d="M2.443 4.123A1.5 1.5 0 0 0 1.5 5.516v14.769a1.5 1.5 0 0 0 2.057 1.392L7.75 20a3 3 0 0 1 2.456.102l3.59 1.796a3 3 0 0 0 2.456.102l5.306-2.123a1.5 1.5 0 0 0 .943-1.392V3.715a1.5 1.5 0 0 0-2.057-1.392L16.25 4a3 3 0 0 1-2.456-.102l-3.59-1.796A3 3 0 0 0 7.749 2L2.443 4.123zm7.642.92A.75.75 0 0 0 9 5.713v10.323c0 .285.16.544.415.671l4.5 2.25a.75.75 0 0 0 1.085-.67V7.963a.75.75 0 0 0-.415-.671l-4.5-2.25z" clipRule="evenodd" /></svg>);