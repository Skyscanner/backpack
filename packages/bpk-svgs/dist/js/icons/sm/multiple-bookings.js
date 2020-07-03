import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" style={{
  width: "1.125rem",
  height: "1.125rem"
}} {...props}><path fillRule="evenodd" d="M3 1.5a3 3 0 0 0-3 3v.75c0 .414.341.74.742.843a3.001 3.001 0 0 1 0 5.814c-.401.103-.742.429-.742.843v.75a3 3 0 0 0 3 3h18a3 3 0 0 0 3-3v-.75c0-.414-.341-.74-.742-.843a3.001 3.001 0 0 1 0-5.814c.401-.103.742-.429.742-.843V4.5a3 3 0 0 0-3-3H3z" clipRule="evenodd" /><path d="M1.5 18.75a.75.75 0 0 1 .75-.75h19.5a.75.75 0 0 1 0 1.5H2.25a.75.75 0 0 1-.75-.75zm1.5 3a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75z" /></svg>);