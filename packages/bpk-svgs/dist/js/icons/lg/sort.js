import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" style={{
      width: "1.5rem",
      height: "1.5rem"
    }} {...this.props}><path d="M5.21 15.39l6.788 5.562 6.789-5.562c.468-.496.117-1.39-.585-1.39H5.912c-.82 0-1.17.894-.702 1.39" /></svg>;
  }

}