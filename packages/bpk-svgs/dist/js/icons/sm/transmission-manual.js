import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" style={{
      width: "1.125rem",
      height: "1.125rem"
    }} {...this.props}><path d="M9 1a8 8 0 1 0 0 16A8 8 0 0 0 9 1zm4.5 7v1.001a.999.999 0 0 1-.999.999H10v2.5a1 1 0 0 1-2 0V10H6.5v2.5a1 1 0 0 1-2 0v-7a1 1 0 0 1 2 0V8H8V5.5a1 1 0 0 1 2 0V8h1.5V5.5a1 1 0 0 1 2 0V8z" /></svg>;
  }

}