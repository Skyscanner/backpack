import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{
      width: "1.5rem",
      height: "1.5rem"
    }} {...this.props}><path d="M13.6 18.83L8 13l5.6-5.8a.81.81 0 0 1 1.4.5v10.6c0 .63-.9.93-1.4.53z" /></svg>;
  }

}