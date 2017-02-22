import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" style={{
      width: "1.125rem",
      height: "1.125rem"
    }} {...this.props}><path d="M13 7c0 .4 0 .7-.1 1 1.2.6 2.1 1.8 2.1 3.3 0 2-1.6 3.7-3.7 3.7-1.5 0-2.7-.9-3.3-2.1-.3.1-.6.1-1 .1.7 1.8 2.4 3 4.3 3 2.6 0 4.7-2.1 4.7-4.7 0-2-1.2-3.6-3-4.3zm-1 0c0-2.8-2.2-5-5-5S2 4.2 2 7s2.2 5 5 5 5-2.2 5-5zm-7 3V5h1V4h2v1h1v1H8V5H6v2h2v1H6v1h3v1H5z" /></svg>;
  }

}