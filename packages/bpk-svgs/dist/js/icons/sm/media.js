import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" style={{
  width: "1.125rem",
  height: "1.125rem"
}} {...props}><path fillRule="evenodd" d="M1.5 6a3 3 0 0 1 3-3h15a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-15a3 3 0 0 1-3-3V6zm9.582 7.442l3.724-2.578c.259-.165.259-.576 0-.74l-3.724-2.566c-.259-.165-.582.041-.582.37v5.144c0 .33.323.535.582.37z" clipRule="evenodd" /><path d="M6 19.5a1.5 1.5 0 0 0 0 3h12a1.5 1.5 0 0 0 0-3H6z" /></svg>);