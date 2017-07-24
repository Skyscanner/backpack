import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" style={{
      width: "1.5rem",
      height: "1.5rem"
    }} {...this.props}><path d="M6 11.5V13h12v-1.5c0-1.2.9-2.2 2-2.4V9c0-.5-.5-1-1-1H5c-.6 0-1 .4-1 1v.2c1.1.2 2 1.2 2 2.3zM20.5 10c-.3 0-.6.1-.9.3l-.3.3c-.1.1-.1.2-.2.4v.1c0 .1-.1.3-.1.4V14H5v-2.5c0-.6-.4-1.2-1-1.4-.2-.1-.3-.1-.5-.1-.8 0-1.5.7-1.5 1.5V16c0 .5.5 1 1 1h2v1.9c0 .5.4 1 1 1s1-.5 1-1V17h10v1.9c0 .5.5 1 1 1s1-.5 1-1V17h2c.5 0 1-.5 1-1v-4.5c0-.8-.7-1.5-1.5-1.5z" /></svg>;
  }

}