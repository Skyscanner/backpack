import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" style={{
      width: "1.5rem",
      height: "1.5rem"
    }} {...this.props}><path d="M8 16c4.4 0 8-3.6 8-8s-3.6-8-8-8-8 3.6-8 8 3.6 8 8 8zM8 3c.6 0 1 .4 1 1s-.4 1-1 1-1-.4-1-1 .4-1 1-1zM7 8c0-.6.4-1 1-1s1 .4 1 1v4c0 .6-.4 1-1 1s-1-.4-1-1V8z" /></svg>;
  }

}