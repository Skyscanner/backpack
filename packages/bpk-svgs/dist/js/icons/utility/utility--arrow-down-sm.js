import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{
      width: "1.5rem",
      height: "1.5rem"
    }} {...this.props}><path d="M6.47 14.6l4 3.8a2.3 2.3 0 0 0 3.1 0l4-3.8a1.49 1.49 0 0 0-2-2.2l-2 1.9V6.5A1.71 1.71 0 0 0 12 5a1.54 1.54 0 0 0-1.5 1.5v7.8l-2-1.9a1.28 1.28 0 0 0-1-.4 1.61 1.61 0 0 0-1.1.5 1.45 1.45 0 0 0 .07 2.1z" /></svg>;
  }

}