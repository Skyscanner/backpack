import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" style={{
  width: "1.125rem",
  height: "1.125rem"
}} {...props}><path fillRule="evenodd" d="M6 .75a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h9a3 3 0 0 0 3-3v-1.5a4.5 4.5 0 0 0 0-9v-1.5a3 3 0 0 0-3-3zm12 10.5a1.5 1.5 0 0 0 0-3zm-3.406-4.02a1.536 1.536 0 0 1-.068 2.15l-5.124 4.87-3.022-3.448a1.535 1.535 0 0 1 .124-2.147 1.486 1.486 0 0 1 2.099.105l.019.021.977 1.114 2.876-2.734a1.486 1.486 0 0 1 2.1.05l.02.02z" /><path d="M1.5 21.75a1.5 1.5 0 0 1 1.5-1.5h15a1.5 1.5 0 0 1 0 3H3a1.5 1.5 0 0 1-1.5-1.5z" /></svg>);