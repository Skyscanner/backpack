import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" style={{
      width: "1.125rem",
      height: "1.125rem"
    }} {...this.props}><path d="M11.6 2c-2.4.2-4.1 2.4-4.1 4.7v.1c0 .3.3.6.6.6h1.2c.4 0 .6-.3.6-.7v.1c0-.9.6-1.7 1.5-1.7.9-.1 1.7.4 1.9 1.3.2.9-.3 1.9-1.3 2.1-.1 0-.3.1-.4.1H8.5c-.6 0-1 .4-1 1V21c0 .6.4 1 1 1h7c.6 0 1-.5 1-1V6.5C16.5 4 14.5 2 12 2h-.4z" /></svg>;
  }

}