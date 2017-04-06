import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{
      width: "1.5rem",
      height: "1.5rem"
    }} {...this.props}><path d="M9.4 6.47l-3.8 4a2.3 2.3 0 0 0 0 3.1l3.8 4a1.49 1.49 0 0 0 2.2-2l-1.9-2h7.8A1.71 1.71 0 0 0 19 12a1.54 1.54 0 0 0-1.5-1.5H9.7l1.9-2a1.28 1.28 0 0 0 .4-1 1.61 1.61 0 0 0-.5-1.1 1.45 1.45 0 0 0-2.1.07z" /></svg>;
  }

}