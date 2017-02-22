import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" style={{
      width: "1.125rem",
      height: "1.125rem"
    }} {...this.props}><path d="M11.1 14.8L5.5 9l5.6-5.8c.5-.5 1.4-.2 1.4.5v10.5c0 .7-.9 1-1.4.6z" /></svg>;
  }

}