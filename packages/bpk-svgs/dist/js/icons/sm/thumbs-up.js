import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" style={{
      width: "1.125rem",
      height: "1.125rem"
    }} {...this.props}><path d="M19 9h-6l.76-3.8a1 1 0 0 0-1-1.2h-.46a2 2 0 0 0-1.84 1.21L8 11v7a1 1 0 0 0 1 1h6.51a2 2 0 0 0 1.92-1.43L20 10.29A1 1 0 0 0 19 9zM4 11h3v8H4z" /></svg>;
  }

}