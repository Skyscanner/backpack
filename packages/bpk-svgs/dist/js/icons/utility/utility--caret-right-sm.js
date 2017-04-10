import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{
      width: "1.5rem",
      height: "1.5rem"
    }} {...this.props}><path d="M10.4 7.17L16 13l-5.6 5.8a.81.81 0 0 1-1.4-.5V7.67c0-.6.9-.9 1.4-.5z" /></svg>;
  }

}