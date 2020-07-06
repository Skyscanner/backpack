import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style={{
  width: "1.5rem",
  height: "1.5rem"
}} {...props}><path fillRule="evenodd" d="M20 10v.061c.002.203-.007.405-.027.604a7.954 7.954 0 0 1-1.357 3.833c-1.51 2.63-4.021 5.198-5.972 6.94a.965.965 0 0 1-1.288 0c-1.95-1.742-4.462-4.31-5.972-6.94a7.955 7.955 0 0 1-1.357-3.833c-.02-.2-.029-.401-.027-.604V10a8 8 0 1 1 16 0zm-8 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" clipRule="evenodd" /></svg>);