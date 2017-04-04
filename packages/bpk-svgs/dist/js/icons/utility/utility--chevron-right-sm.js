import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style={{
      width: "1.5rem",
      height: "1.5rem"
    }} {...this.props}><path d="M15.39 13l-4.8 5.4a1 1 0 0 1-1.5.1A1.12 1.12 0 0 1 9 16.9l3.4-3.9-3.51-3.9a1.13 1.13 0 1 1 1.7-1.5z" /></svg>;
  }

}