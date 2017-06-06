import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" style={{
      width: "1.5rem",
      height: "1.5rem"
    }} {...this.props}><path d="M4 8a2 2 0 1 1-.001-3.999A2 2 0 0 1 4 8zm2 4a2 2 0 1 0-3.999-.001A2 2 0 0 0 6 12zm0 6a2 2 0 1 0-3.999-.001A2 2 0 0 0 6 18zm5-10h10a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H11a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1zm0 6h10a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H11a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1zm0 6h10a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H11a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1z" /></svg>;
  }

}