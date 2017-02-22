import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" style={{
      width: "1.125rem",
      height: "1.125rem"
    }} {...this.props}><path d="M14 11h-2V5L9 2 6 5v2H4c-1.1 0-2 .9-2 2v7h14v-3c0-1.1-.9-2-2-2zm-8 4H4v-2h2v2zm0-4H4V9h2v2zm4 4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm4 8h-2v-2h2v2z" /></svg>;
  }

}