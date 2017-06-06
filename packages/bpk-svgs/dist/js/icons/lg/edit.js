import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" style={{
      width: "1.5rem",
      height: "1.5rem"
    }} {...this.props}><path d="M18.1 9.8l2.4-2.4c1.1-1.1 1.1-2.8 0-3.9s-2.8-1.1-3.9 0l-2.4 2.4 3.9 3.9zm-5.3-2.5l-8.5 8.5-1.6 4.6c-.1.5.4 1 .9.9l4.6-1.6 8.5-8.5-3.9-3.9z" /></svg>;
  }

}