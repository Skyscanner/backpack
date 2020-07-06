import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" style={{
  width: "1.125rem",
  height: "1.125rem"
}} {...props}><path fillRule="evenodd" d="M23.56.44a1.5 1.5 0 0 1 0 2.12l-4.93 4.93c.04.007-.04 0 0 0L3.724 22.399c-.07-.013.069.019 0 0L2.56 23.561a1.5 1.5 0 0 1-2.122-2.122l1.163-1.162A3.005 3.005 0 0 1 1.5 19.5v-9a3 3 0 0 1 3-3h.75A.75.75 0 0 0 6 6.75V5.319c0-.425.11-.939.457-1.358C7.312 2.926 9.297 1.5 12 1.5c2.693 0 4.547 1.413 5.445 2.386.09.098.168.203.235.312L21.44.44a1.5 1.5 0 0 1 2.12 0zM15 7c0 .276-.168.5-.375.5h-5.25C9.168 7.5 9 7.276 9 7v-.583c0-.264.075-.52.23-.684C9.751 5.176 10.721 4.5 12 4.5c1.276 0 2.208.676 2.758 1.262.16.171.242.436.242.71V7z" clipRule="evenodd" /><path d="M21.91 8.712L8.12 22.5H19.5a3 3 0 0 0 3-3v-9c0-.67-.22-1.289-.59-1.788z" /></svg>);