import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" style={{
      width: "1.5rem",
      height: "1.5rem"
    }} {...this.props}><path d="M7.5 12l6.4-7.2c.6-.6 1.5-.7 2.1-.1.6.5.7 1.5.1 2.1L11.5 12l4.6 5.2c.6.6.5 1.6-.1 2.1-.6.6-1.6.5-2.1-.1L7.5 12z" /></svg>;
  }

}