import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style={{
      width: "1.5rem",
      height: "1.5rem"
    }} {...this.props}><path d="M4 19h14c1.1 0 3-.9 3-2H1c0 1.1 1.9 2 3 2zM19 4h-2V3H5v10.1A2.9 2.9 0 0 0 7.9 16h6.2a2.9 2.9 0 0 0 2.9-2.9V13a4.19 4.19 0 0 0 4-4.2V6a2 2 0 0 0-2-2zm-4 6h-3v3h-2v-3H7V8h3V5h2v3h3zm4-1.2a2.26 2.26 0 0 1-2 2.2V6h2z" /></svg>;
  }

}