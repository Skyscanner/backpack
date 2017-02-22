import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" style={{
      width: "1.125rem",
      height: "1.125rem"
    }} {...this.props}><path d="M11 1H3.857C3.384 1 3 1.358 3 1.8v14.4c0 .442.384.8.857.8h10.286c.473 0 .857-.358.857-.8V5l-4-4zm1 10.499C12 14.159 9 15 9 15s-3-.841-3-3.501V8.322h.098c.199.438.74.76 1.402.76.817 0 1.478-.481 1.497-1.08l.001-.001h.004l.001.001c.019.598.68 1.08 1.497 1.08.661 0 1.203-.322 1.402-.76H12v3.177zM10.512 6A.512.512 0 0 1 10 5.488V2l4 4h-3.488z" /></svg>;
  }

}