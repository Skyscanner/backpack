import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" style={{
      width: "1.125rem",
      height: "1.125rem"
    }} {...this.props}><path d="M18.25 3A16.832 16.832 0 0 0 12 2C6 2 4 4 4 4v8s0 6 8 10a15.4 15.4 0 0 0 6.576-5.729q.237-.4.424-.771a8.637 8.637 0 0 0 1-3.5V4a5.544 5.544 0 0 0-1.75-1zM12 19.734C6.191 16.44 6 12.164 6 12V5.079A13.629 13.629 0 0 1 12 4v15.734z" /></svg>;
  }

}