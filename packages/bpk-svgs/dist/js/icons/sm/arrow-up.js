import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" style={{
      width: "1.125rem",
      height: "1.125rem"
    }} {...this.props}><path d="M4.3 15.7L12 8.6l7.7 7.1c.6.6.2 1.7-.7 1.7H5c-.9 0-1.3-1-.7-1.7z" /></svg>;
  }

}