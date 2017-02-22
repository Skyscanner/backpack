import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{
      width: "1.5rem",
      height: "1.5rem"
    }} {...this.props}><path d="M10.8 12l1.7-.6 2.5 1.2 5.7-2.1c.5-.2 1.1.1 1.3.6s-.1 1.1-.6 1.3l-1.8.7-2.5 2.9c-.3.4-.9.1-.9-.3v-1.3l-.6.2c-1.2.4-2.5.1-3.3-.8L10.8 12zM9 17V9l3.4-4.2c.2-.3 0-.8-.4-.8H3c-.4 0-.6.5-.4.8L6 9v8.9H2v2h20v-2H9V17z" /></svg>;
  }

}