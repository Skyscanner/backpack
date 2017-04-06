import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{
      width: "1.5rem",
      height: "1.5rem"
    }} {...this.props}><path d="M11.6 9C10.5 6.5 7.5 5.3 5 6.4S1.3 10.5 2.4 13s4.1 3.7 6.6 2.6c1.2-.5 2.1-1.4 2.6-2.6H16v3h2v-3h2v3h2V9H11.6zM7 12.8c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" /></svg>;
  }

}