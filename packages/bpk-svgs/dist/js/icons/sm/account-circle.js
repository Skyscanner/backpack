import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" style={{
      width: "1.125rem",
      height: "1.125rem"
    }} {...this.props}><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 3c1.7 0 3 1.3 3 3s-1.3 3-3 3-3-1.3-3-3 1.4-3 3-3zm0 15c-2.4 0-4.7-1.1-6.2-3 .6-1.2 1.5-2.3 2.7-3.1.8-.6 1.7-.9 2.7-.9h1.6c1 0 1.9.3 2.7.9 1.2.8 2.1 1.9 2.7 3.1-1.4 1.9-3.7 3-6.2 3z" /></svg>;
  }

}