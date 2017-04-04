import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style={{
      width: "1.5rem",
      height: "1.5rem"
    }} {...this.props}><path d="M18.79 8.6L12 3 5.21 8.6A.84.84 0 0 0 5.8 10h12.29a.85.85 0 0 0 .7-1.4" /></svg>;
  }

}