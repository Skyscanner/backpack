import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" style={{
  width: "1.125rem",
  height: "1.125rem"
}} {...props}><path fillRule="evenodd" d="M4.887 14.586c-.526-.47-.506-1.52 0-2.008l6.397-5.948a1 1 0 0 1 1.358-.004l6.532 6.012c.526.47.369 1.46-.138 1.948-.508.487-1.47.573-1.997.103l-5.078-4.638-4.97 4.535c-.506.488-1.577.47-2.104 0z" clipRule="evenodd" /></svg>);