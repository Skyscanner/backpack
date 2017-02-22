import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{
      width: "1.5rem",
      height: "1.5rem"
    }} {...this.props}><path d="M13 6h-2c-.6 0-1-.4-1-1V3c0-.6.4-1 1-1h2c.6 0 1 .4 1 1v2c0 .6-.4 1-1 1zm-2 2h2c.6 0 1 .4 1 1v12c0 .5-.5 1-1 1h-2c-.6 0-1-.4-1-1V9c0-.6.5-1 1-1z" /></svg>;
  }

}