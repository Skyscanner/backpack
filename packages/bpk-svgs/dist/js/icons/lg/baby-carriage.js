import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" style={{
      width: "1.5rem",
      height: "1.5rem"
    }} {...this.props}><path d="M10.546 19.5a2.5 2.5 0 1 1-2.5-2.5 2.5 2.5 0 0 1 2.5 2.5zm5.5-2.5a2.5 2.5 0 1 0 2.5 2.5 2.5 2.5 0 0 0-2.501-2.5zm-6-7V2a8 8 0 0 0-8 8zm12 1h-20a5 5 0 0 0 5 5h10a5 5 0 0 0 5-5z" /></svg>;
  }

}