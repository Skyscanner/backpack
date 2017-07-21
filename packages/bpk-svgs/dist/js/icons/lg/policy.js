import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" style={{
      width: "1.5rem",
      height: "1.5rem"
    }} {...this.props}><path d="M15 2H6c-.6 0-1 .4-1 1v18c0 .6.4 1 1 1h12c.6 0 1-.4 1-1V6l-4-4zm1 12.2c0 3.8-4 5-4 5s-4-1.2-4-5V9.6h.1c.3.6 1 1.1 1.9 1.1 1.1 0 2-.7 2-1.5 0 .9.9 1.5 2 1.5.9 0 1.6-.5 1.9-1.1h.1v4.6zM14.5 7c-.3 0-.5-.2-.5-.5V3l4 4h-3.5z" /></svg>;
  }

}