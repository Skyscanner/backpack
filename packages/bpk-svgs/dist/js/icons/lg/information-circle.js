import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" {...this.props}><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm1.5 16.1c0 .5-.4.9-.9.9h-1.1c-.5 0-.9-.4-.9-.9V11c0-.5.4-.9.9-.9h1.1c.5 0 .9.4.9.9v7.1zm0-11.1c0 .5-.5 1-1 1h-1c-.5 0-1-.5-1-1V6c0-.5.5-1 1-1h1c.5 0 1 .5 1 1v1z" /></svg>;
  }

}