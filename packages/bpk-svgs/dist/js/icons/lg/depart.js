import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" style={{
      width: "1.5rem",
      height: "1.5rem"
    }} {...this.props}><path d="M4.8 11.1L3.1 10c-.2-.2-.1-.5.1-.6l1.3-.5c.2-.1.4 0 .5.1l2 1.1 3.7-1.4L6 3.9c-.1-.2-.1-.5.1-.5l.6-.2c.6-.3 1.2-.2 1.7.1l5.7 4 5.3-2.1c.5-.2 1.3.1 1.5.6s-.1 1.2-.6 1.4l-10.5 4c-1.4.5-3 .6-4.4.1-.2.1-.4-.1-.6-.2zm5.7 9l4.7-2.8c.7-.4.7-1.3 0-1.7l-4.7-2.8c-.7-.3-1.5.2-1.5.9V15H4.5c-.8 0-1.5.7-1.5 1.5S3.7 18 4.5 18H9v1.3c0 .7.8 1.2 1.5.8z" /></svg>;
  }

}