import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" style={{
      width: "1.5rem",
      height: "1.5rem"
    }} {...this.props}><path d="M6 7v13a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6zm.938-3.001h10.125c1.105 0 2.002.896 2.002 2.002H4.936c0-1.106.896-2.002 2.002-2.002zm2.062-1c0-.55.45-1 1-1h4c.55 0 1 .45 1 1" /></svg>;
  }

}