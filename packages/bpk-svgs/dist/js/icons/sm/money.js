import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" style={{
      width: "1.125rem",
      height: "1.125rem"
    }} {...this.props}><circle cx="9" cy="7" r="2" /><path d="M16 4v6H2V4h14m0-1H2c-.5 0-1 .5-1 1v6c0 .6.5 1 1 1h14c.5 0 1-.4 1-1V4c0-.5-.5-1-1-1zm-1 11c0 .6-.4 1-1 1H4c-.5 0-1-.4-1-1h12zm1-2c0 .6-.4 1-1 1H3c-.5 0-1-.4-1-1h14z" /></svg>;
  }

}