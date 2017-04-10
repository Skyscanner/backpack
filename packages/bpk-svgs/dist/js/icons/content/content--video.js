import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{
      width: "1.5rem",
      height: "1.5rem"
    }} {...this.props}><path d="M20 4H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h4v2h8v-2h4a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 12H4V6h16zm-4.54-5l-6 3V8z" /></svg>;
  }

}