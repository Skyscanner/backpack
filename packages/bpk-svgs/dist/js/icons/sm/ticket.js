import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" style={{
  width: "1.125rem",
  height: "1.125rem"
}} {...props}><path fillRule="evenodd" d="M3 1.5a3 3 0 0 0-3 3v3.75c0 .414.341.74.742.843a3.001 3.001 0 0 1 0 5.814c-.401.103-.742.429-.742.843v3.75a3 3 0 0 0 3 3h18a3 3 0 0 0 3-3v-3.75c0-.414-.341-.74-.742-.843a3.001 3.001 0 0 1 0-5.814c.401-.103.742-.429.742-.843V4.5a3 3 0 0 0-3-3H3zM9.857 6c.266 0 .515.125.674.337l2.583 1.943a.45.45 0 0 1-.36.72h-2.5a.45.45 0 0 1-.436-.34L9.04 7.046A.842.842 0 0 1 9.857 6zM18 12c0 .828-.75 1.5-2.25 1.5h-1.532a1.5 1.5 0 0 0-1.35.845l-2.337 3.318a.842.842 0 0 1-1.49-.71l1.098-2.894a.45.45 0 0 0-.437-.559H8.03l-.532 1.063a.79.79 0 0 1-1.473-.545L6.529 12l-.505-2.018a.79.79 0 0 1 1.473-.545l.532 1.063h7.721c1.5 0 2.25.672 2.25 1.5z" clipRule="evenodd" /></svg>);