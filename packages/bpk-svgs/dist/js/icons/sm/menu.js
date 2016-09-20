import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" {...this.props}><path d="M2 4h14a1 1 0 0 1 0 2H2a1 1 0 0 1 0-2zm0 4h14a1 1 0 0 1 0 2H2a1 1 0 0 1 0-2zm0 4h14a1 1 0 0 1 0 2H2a1 1 0 0 1 0-2z" /></svg>;
  }

}