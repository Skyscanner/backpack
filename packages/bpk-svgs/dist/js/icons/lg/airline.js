import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{
      width: "1.5rem",
      height: "1.5rem"
    }} {...this.props}><path d="M21 4h-3.6c-.6 0-1.1.2-1.5.6L2 20h14.1l5.8-14.6c.3-.7-.2-1.4-.9-1.4z" /></svg>;
  }

}