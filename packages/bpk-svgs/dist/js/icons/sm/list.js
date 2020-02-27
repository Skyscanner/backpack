import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" style={{
  width: "1rem",
  height: "1rem"
}} {...props}><path d="M4 8c-1.1 0-2-.9-2-2s.8-2 2-2c-.1 0 0 0 0 0 1.1 0 2 .9 2 2-.1 1.1-.9 2-2 2zm2 4c0-1.1-.8-2-2-2s-2 .8-2 2v.1c0 1.1.9 2 2 2 1.1-.2 2-1 2-2.1zm0 6c0-1.1-.8-2-2-2s-2 .8-2 2v.1c0 1.1.9 2 2 2 1.1-.2 2-1 2-2.1zm5-10h10c.6 0 1-.4 1-1V5c0-.6-.4-1-1-1H11c-.6 0-1 .4-1 1v2c0 .6.4 1 1 1zm0 6h10c.6 0 1-.4 1-1v-2c0-.6-.4-1-1-1H11c-.6 0-1 .4-1 1v2c0 .6.4 1 1 1zm0 6h10c.6 0 1-.4 1-1v-2c0-.6-.4-1-1-1H11c-.6 0-1 .4-1 1v2c0 .6.4 1 1 1z" /></svg>);