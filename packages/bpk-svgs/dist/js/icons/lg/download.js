import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" style={{
      width: "1.5rem",
      height: "1.5rem"
    }} {...this.props}><path d="M3 17h2v2h14v-2h2v4H3v-4zm10-4V3h-2v10l-2.5-2.5L7 12l5 5 5-5-1.5-1.5L13 13z" /></svg>;
  }

}