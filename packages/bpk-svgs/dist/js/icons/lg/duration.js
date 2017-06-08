import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" style={{
      width: "1.5rem",
      height: "1.5rem"
    }} {...this.props}><path d="M12 4c4.4 0 8 3.6 8 8s-3.6 8-8 8-8-3.6-8-8 3.6-8 8-8m0-2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 4.5V12l-3.9 3.9c-.2.2-.2.5 0 .7 1.4 1.1 3.2 1.7 5.2 1.3 2.2-.5 4-2.3 4.5-4.5.8-3.7-1.9-7-5.3-7.3-.3-.1-.5.1-.5.4z" /></svg>;
  }

}