import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" style={{
  width: "1.125rem",
  height: "1.125rem"
}} {...props}><path d="M13.5 16.963c0-.357.253-.66.595-.76a7.5 7.5 0 1 0-4.19 0c.342.1.595.403.595.76V21a1.5 1.5 0 0 0 3 0v-4.037z" /></svg>);