import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{
      width: "1.5rem",
      height: "1.5rem"
    }} {...this.props}><path d="M18 6H6a2 2 0 0 0-2 2v8a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V8a2 2 0 0 0-2-2zM6 16V8h12v8zm16 1H2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2z" /></svg>;
  }

}