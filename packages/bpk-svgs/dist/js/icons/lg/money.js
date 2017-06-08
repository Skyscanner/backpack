import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" style={{
      width: "1.5rem",
      height: "1.5rem"
    }} {...this.props}><path d="M20 6v6H4V6h16m1-2H3c-.5 0-1 .5-1 1v8c0 .6.5 1 1 1h18c.6 0 1-.5 1-1V5c0-.5-.5-1-1-1z" /><circle cx="12" cy="9" r="2" /><path d="M20 17H4c-.6 0-1-.5-1-1v-1h18v1c0 .5-.5 1-1 1zm0 1H4v1c0 .6.5 1 1 1h14c.6 0 1-.5 1-1v-1z" /></svg>;
  }

}