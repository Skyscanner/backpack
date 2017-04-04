import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style={{
      width: "1.5rem",
      height: "1.5rem"
    }} {...this.props}><path d="M8.5 17h9.63L22 7a.71.71 0 0 0-.63-1h-1.23a1.7 1.7 0 0 0-1.21.51zM14 8.8a.58.58 0 0 0-.6-.8h-1.06a1.58 1.58 0 0 0-1.07.42L2 17h5.5l5.24-5.27z" /></svg>;
  }

}