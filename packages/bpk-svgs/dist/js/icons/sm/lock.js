import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" style={{
  width: "1.125rem",
  height: "1.125rem"
}} {...props}><path fillRule="evenodd" d="M3 11.571c0-.419.275-.791.684-.924L5.675 10c.108-.035.217-.07.325-.102V7.5a6 6 0 1 1 12 0v2.398c.108.033.217.067.325.102l1.991.647a.977.977 0 0 1 .684.924V19.5a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3v-7.929zm6-2.35a20.521 20.521 0 0 1 6 0V7.5a3 3 0 1 0-6 0v1.72zm3 4.279a1.5 1.5 0 0 0-1.5 1.5v1.5a1.5 1.5 0 0 0 3 0V15a1.5 1.5 0 0 0-1.5-1.5z" clipRule="evenodd" /></svg>);