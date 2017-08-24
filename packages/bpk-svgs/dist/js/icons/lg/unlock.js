import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" style={{
      width: "1.5rem",
      height: "1.5rem"
    }} {...this.props}><path d="M17 10.027V5.982a4 4 0 0 0-4-4h-2a4 4 0 0 0-4 4v1.036h2V5.982a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v4.036H6.95a2.165 2.165 0 0 0-2 2.1v7.7a2.22 2.22 0 0 0 2.2 2.2h9.7a2.22 2.22 0 0 0 2.2-2.2v-7.7A2.342 2.342 0 0 0 17 10.027z" /></svg>;
  }

}