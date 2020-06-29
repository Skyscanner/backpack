import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style={{
  width: "1.5rem",
  height: "1.5rem"
}} {...props}><path d="M3.603 3c-.348 0-.696.35-.58.583L4.88 15.017C4.997 15.95 6 17 7 17h10a1 1 0 0 0 1-1v-1c0-1-1-2-2-2H9.724c-.432 0-.814-.275-.952-.685-.468-1.39-1.566-4.58-2.453-6.632C5.854 4.05 5.229 3 3.603 3zM3 19a1 1 0 0 1 1-1h16a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1z" /></svg>);