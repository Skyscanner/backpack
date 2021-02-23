import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" style={{
  width: "1.125rem",
  height: "1.125rem"
}} {...props}><path d="M6.457 3.96C7.312 2.927 9.297 1.5 12 1.5c2.693 0 4.547 1.413 5.445 2.386.393.425.555.985.555 1.5V6.75c0 .414.336.75.75.75h.75a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-15a3 3 0 0 1-3-3v-9a3 3 0 0 1 3-3h.75A.75.75 0 0 0 6 6.75V5.319c0-.425.11-.939.457-1.358zM15 7v-.528c0-.274-.082-.539-.242-.71C14.208 5.176 13.276 4.5 12 4.5c-1.278 0-2.248.676-2.77 1.233-.155.164-.23.42-.23.684V7c0 .276.168.5.375.5h5.25c.207 0 .375-.224.375-.5zm-4.94 3.94a1.5 1.5 0 0 0-2.12 2.12L9.878 15l-1.94 1.94a1.5 1.5 0 0 0 2.122 2.12L12 17.122l1.94 1.94a1.5 1.5 0 0 0 2.12-2.122L14.122 15l1.94-1.94a1.5 1.5 0 0 0-2.122-2.12L12 12.878l-1.94-1.94z" /></svg>);