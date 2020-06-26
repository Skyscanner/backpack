import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" style={{
  width: "1.125rem",
  height: "1.125rem"
}} {...props}><path fillRule="evenodd" d="M1.955 16.94c-1.296 2.474.33 5.56 2.93 5.56h14.23c2.6 0 4.226-3.086 2.93-5.56L14.93 3.36c-1.3-2.48-4.56-2.48-5.86 0L1.955 16.94zm11.543-.442a1.498 1.498 0 1 1-2.996 0 1.498 1.498 0 0 1 2.996 0zm-.005-4.322a1.5 1.5 0 0 1-2.98.001l-.01-.175-.003-4.501.01-.175a1.5 1.5 0 0 1 2.98-.001l.01.175.003 4.501-.01.175z" clipRule="evenodd" /></svg>);