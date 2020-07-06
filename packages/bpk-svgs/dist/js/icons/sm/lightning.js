import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" style={{
  width: "1.125rem",
  height: "1.125rem"
}} {...props}><path fillRule="evenodd" d="M11.905 22.28c-.23.385-.858.233-.858-.207v-6.628c0-.235-.205-.426-.458-.426h-5.63c-.35 0-.57-.349-.401-.633L12.095 1.72c.23-.385.858-.233.858.207v6.628c0 .235.205.426.458.426h5.63c.35 0 .57.349.401.633L11.905 22.28z" clipRule="evenodd" /></svg>);