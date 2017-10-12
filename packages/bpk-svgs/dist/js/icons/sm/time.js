import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" style={{
      width: "1.125rem",
      height: "1.125rem"
    }} {...this.props}><path d="M12 4a8 8 0 1 1-8 8 8 8 0 0 1 8-8m0-2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm-1 10.41l3.89 3.89a1 1 0 0 0 1.41 0 1 1 0 0 0 0-1.41l-3.3-3.3V8a1 1 0 0 0-1-1 1 1 0 0 0-1 1z" /></svg>;
  }

}