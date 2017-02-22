import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" style={{
      width: "1.125rem",
      height: "1.125rem"
    }} {...this.props}><path d="M2 16v-1.1c0-2.8 2.2-5 5-5h4c2.8 0 5 2.2 5 5V16H2zM12 5c0-1.7-1.3-3-3-3S6 3.3 6 5s1.3 3 3 3 3-1.3 3-3z" /></svg>;
  }

}