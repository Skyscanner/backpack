import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" style={{
      width: "1.125rem",
      height: "1.125rem"
    }} {...this.props}><path d="M2.25 11.75h2v2h9.5v-2h2v4H2.25v-4z" /><path d="M10 8V2.25H8V8L6 6 4.5 7.5 9 12l4.5-4.5L12 6l-2 2z" /></svg>;
  }

}