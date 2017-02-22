import React from "react";
export default class SVG extends React.Component {
  render() {
    return <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" style={{
      width: "1.125rem",
      height: "1.125rem"
    }} {...this.props}><path d="M5 17H4a1 1 0 0 1-1-1v-1h3v1a1 1 0 0 1-1 1zm10-1v-1h-3v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1zm0-12v10H3V4c0-1.76 1.039-3 2.799-3h6.4C13.959 1 15 2.24 15 4zM7 2.5c0 .275.225.5.5.5h3c.275 0 .5-.225.5-.5s-.225-.5-.5-.5h-3c-.275 0-.5.225-.5.5zM6 11a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm8 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm0-6c0-.442-.558-1-1-1H5c-.442 0-1 .558-1 1v4h10V5z" /></svg>;
  }

}