import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" style={{
      width: "1.5rem",
      height: "1.5rem"
    }} {...this.props}><path d="M14.5 7H11V3.5c0-.8-.7-1.5-1.5-1.5h-1C7.7 2 7 2.7 7 3.5V7H3.5C2.7 7 2 7.7 2 8.5v1c0 .8.7 1.5 1.5 1.5H7v3.5c0 .8.7 1.5 1.5 1.5h1c.8 0 1.5-.7 1.5-1.5V11h3.5c.8 0 1.5-.7 1.5-1.5v-1c0-.8-.7-1.5-1.5-1.5z" /></svg>;
  }

}