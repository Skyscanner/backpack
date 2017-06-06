import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" style={{
      width: "1.5rem",
      height: "1.5rem"
    }} {...this.props}><path d="M14.8 12l4.9-4.9c.4-.4.4-1 0-1.4l-1.4-1.4c-.4-.4-1-.4-1.4 0L12 9.2l-4.9-5c-.4-.4-1-.4-1.4 0L4.2 5.6c-.4.4-.4 1 0 1.4l5 5-4.9 4.9c-.4.4-.4 1 0 1.4l1.4 1.4c.4.4 1 .4 1.4 0l4.9-4.9 4.9 4.9c.4.4 1 .4 1.4 0l1.4-1.4c.4-.4.4-1 0-1.4L14.8 12z" /></svg>;
  }

}