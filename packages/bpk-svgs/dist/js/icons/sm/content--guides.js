import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" style={{
  width: "1rem",
  height: "1rem"
}} {...props}><path d="M2 4h4.913c1.72 0 3.37.719 4.587 2v12l-1.9-1H2V4zm1 15h8l-2-1H3v1zm18-1h-6l-2 1h8v-1zm1-14v13h-7.6l-1.9 1V6c1.217-1.281 2.867-2 4.587-2H22zm-2 7h-5v1h5v-1zm0-2h-5v1h5V9zm0-2h-5v1h5V7z" /></svg>);