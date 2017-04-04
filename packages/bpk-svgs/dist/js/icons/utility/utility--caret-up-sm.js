import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style={{
      width: "1.5rem",
      height: "1.5rem"
    }} {...this.props}><path d="M6.17 14.6L12 9l5.8 5.6a.81.81 0 0 1-.5 1.4H6.67c-.6 0-.9-.9-.5-1.4z" /></svg>;
  }

}